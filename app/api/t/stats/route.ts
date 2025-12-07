import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAdminAuth } from "@/lib/middleware/admin-auth";

// Typen für die Abfragen
interface SessionWithDuration {
  startedAt: Date;
  endedAt: Date | null;
}

interface PropertyBasic {
  id: string;
  title: string;
  slug: string;
  type: string;
}

interface PageviewGroup {
  path: string;
  _count: number;
}

interface EventGroup {
  propertyId: string | null;
  _count: number;
}

interface PropertyWithStats {
  id: string;
  title: string;
  type: string;
  pageviews: number;
  whatsappClicks: number;
}

// Alte Analytics-Daten aufräumen (90+ Tage alt)
async function cleanupOldAnalytics() {
  const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

  try {
    // Alte Sessions und zugehörige Pageviews/Events löschen (Cascade)
    const deleted = await prisma.analyticsSession.deleteMany({
      where: {
        startedAt: { lt: ninetyDaysAgo },
      },
    });

    if (deleted.count > 0) {
      // console.log(`[ANALYTICS_CLEANUP] ${deleted.count} alte Sessions gelöscht`);
    }
  } catch {
    // Cleanup-Fehler ignorieren, nicht blockierend
  }
}

// GET: Analytics-Statistiken für Admin Dashboard (Admin only)
async function getStatsHandler() {
  // Cleanup im Hintergrund ausführen (nicht blockierend, mit Error Handling)
  cleanupOldAnalytics().catch((err) => {
    console.warn("[ANALYTICS_CLEANUP_ERROR]", err);
  });

  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // KPIs parallel abfragen
    const [
      uniqueVisitorsResult,
      totalPageviews,
      whatsappClicks,
      sessionsWithDuration,
      pageviewsPerDay,
      propertyStats,
      propertyPageviews,
      propertyWhatsappClicks,
    ] = await Promise.all([
      // Unique Visitors - COUNT(DISTINCT sessionId) statt findMany
      // WICHTIG: findMany mit distinct lädt ALLE Objekte in den RAM!
      // Bei tausenden Sessions = Memory Leak / OOM auf Serverless
      prisma.$queryRaw<[{ count: bigint }]>`
        SELECT COUNT(DISTINCT "sessionId") as count
        FROM "AnalyticsPageview"
        WHERE "occurredAt" >= ${thirtyDaysAgo}
      `,

      // Total Pageviews
      prisma.analyticsPageview.count({
        where: { occurredAt: { gte: thirtyDaysAgo } },
      }),

      // WhatsApp Clicks
      prisma.analyticsEvent.count({
        where: {
          eventType: "whatsapp_click",
          occurredAt: { gte: thirtyDaysAgo },
        },
      }),

      // Sessions mit Duration (für Avg Session Duration)
      prisma.analyticsSession.findMany({
        where: {
          startedAt: { gte: thirtyDaysAgo },
          endedAt: { not: null },
        },
        select: { startedAt: true, endedAt: true },
      }),

      // Pageviews pro Tag (letzte 30 Tage)
      prisma.$queryRaw<{ date: Date; count: bigint }[]>`
        SELECT DATE("occurredAt") as date, COUNT(*) as count
        FROM "AnalyticsPageview"
        WHERE "occurredAt" >= ${thirtyDaysAgo}
        GROUP BY DATE("occurredAt")
        ORDER BY date ASC
      `,

      // Property-Stats: Views und WhatsApp-Clicks pro Property
      prisma.property.findMany({
        where: { status: { not: "archived" } },
        select: {
          id: true,
          title: true,
          slug: true,
          type: true,
        },
      }),

      // Pageviews pro Property
      prisma.analyticsPageview.groupBy({
        by: ["path"],
        where: {
          occurredAt: { gte: thirtyDaysAgo },
          path: { startsWith: "/property/" },
        },
        _count: true,
      }),

      // WhatsApp Clicks pro Property
      prisma.analyticsEvent.groupBy({
        by: ["propertyId"],
        where: {
          eventType: "whatsapp_click",
          occurredAt: { gte: thirtyDaysAgo },
          propertyId: { not: null },
        },
        _count: true,
      }),
    ]);

    // Avg Session Duration berechnen (max 2 Stunden, unrealistische Sessions ausfiltern)
    const MAX_SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 Stunden max (Millisekunden)
    let avgSessionDuration = 0;
    if (sessionsWithDuration.length > 0) {
      const validSessions = sessionsWithDuration.filter(
        (session: SessionWithDuration) => {
          if (!session.endedAt) return false;
          const duration = session.endedAt.getTime() - session.startedAt.getTime();
          return duration > 0 && duration <= MAX_SESSION_DURATION;
        }
      );

      if (validSessions.length > 0) {
        const totalDuration = validSessions.reduce(
          (acc: number, session: SessionWithDuration) => {
            return acc + (session.endedAt!.getTime() - session.startedAt.getTime());
          },
          0
        );
        avgSessionDuration = Math.round(totalDuration / validSessions.length / 1000);
      }
    }

    // Unique Visitors aus Raw Query extrahieren
    const uniqueVisitors = Number(uniqueVisitorsResult[0]?.count ?? 0);

    // Maps für O(1) Lookup erstellen (statt O(N*M) mit .find() in Loop)
    const pageviewsByPath = new Map<string, number>(
      propertyPageviews.map((pv: PageviewGroup) => [pv.path, pv._count])
    );
    const clicksByPropertyId = new Map<string, number>(
      propertyWhatsappClicks
        .filter((wc: EventGroup) => wc.propertyId !== null)
        .map((wc: EventGroup) => [wc.propertyId as string, wc._count])
    );

    // Property Stats zusammenführen (jetzt O(N) statt O(N*M))
    const propertyStatsWithCounts: PropertyWithStats[] = propertyStats.map(
      (property: PropertyBasic) => {
        return {
          id: property.id,
          title: property.title,
          type: property.type,
          pageviews: pageviewsByPath.get(`/property/${property.slug}`) || 0,
          whatsappClicks: clicksByPropertyId.get(property.id) || 0,
        };
      }
    );

    // Nach Pageviews sortieren
    propertyStatsWithCounts.sort(
      (a: PropertyWithStats, b: PropertyWithStats) => b.pageviews - a.pageviews
    );

    // Chart-Daten formatieren (letzte 30 Tage mit 0 für fehlende Tage)
    const chartData: { date: string; pageviews: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split("T")[0];
      const entry = pageviewsPerDay.find(
        (pv: { date: Date; count: bigint }) =>
          pv.date.toISOString().split("T")[0] === dateStr
      );
      chartData.push({
        date: dateStr,
        pageviews: entry ? Number(entry.count) : 0,
      });
    }

    return NextResponse.json({
      kpis: {
        visitors: uniqueVisitors,
        pageviews: totalPageviews,
        whatsappClicks,
        avgSessionDuration,
      },
      chartData,
      propertyStats: propertyStatsWithCounts,
    });
  } catch (error) {
    console.error("[ANALYTICS_STATS_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Analytics", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

export const GET = withAdminAuth(getStatsHandler);
