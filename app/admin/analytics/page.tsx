"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "@/lib/context/admin-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatType } from "@/lib/format";

interface AnalyticsData {
  kpis: {
    visitors: number;
    pageviews: number;
    whatsappClicks: number;
    avgSessionDuration: number;
  };
  chartData: { date: string; pageviews: number }[];
  propertyStats: {
    id: string;
    title: string;
    type: string;
    pageviews: number;
    whatsappClicks: number;
  }[];
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

function KPICard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
}) {
  return (
    <div className="border border-[--glass-border] bg-[--card] p-6">
      <div className="text-xs font-medium uppercase tracking-[0.2em] text-[--muted]">
        {title}
      </div>
      <div className="mt-2 font-serif text-4xl font-light text-[--primary]">
        {value}
      </div>
      {subtitle && (
        <div className="mt-1 text-sm text-[--muted]">{subtitle}</div>
      )}
    </div>
  );
}

function SimpleBarChart({ data }: { data: { date: string; pageviews: number }[] }) {
  const maxValue = Math.max(...data.map((d) => d.pageviews), 1);

  return (
    <div className="border border-[--glass-border] bg-[--card] p-6">
      <h3 className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-[--muted]">
        Seitenaufrufe (letzte 30 Tage)
      </h3>
      <div className="flex h-48 items-end gap-1">
        {data.map((day, index) => {
          const height = (day.pageviews / maxValue) * 100;
          const date = new Date(day.date);
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;

          return (
            <div
              key={day.date}
              className="group relative flex-1"
              title={`${day.date}: ${day.pageviews} Aufrufe`}
            >
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded bg-[--surface] px-2 py-1 text-xs text-[--text] group-hover:block">
                {day.pageviews}
              </div>
              {/* Bar */}
              <div
                className={`w-full transition-all ${
                  isWeekend ? "bg-[--primary]/30" : "bg-[--primary]"
                } hover:bg-[--primary]`}
                style={{ height: `${Math.max(height, 2)}%` }}
              />
              {/* Date Label (every 7th day) */}
              {index % 7 === 0 && (
                <div className="absolute -bottom-5 left-0 text-[10px] text-[--muted]">
                  {date.getDate()}.{date.getMonth() + 1}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-8 flex items-center gap-4 text-xs text-[--muted]">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-[--primary]" />
          <span>Wochentage</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-[--primary]/30" />
          <span>Wochenende</span>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const { isAdmin, isLoading: authLoading } = useAdmin();
  const router = useRouter();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push("/");
    }
  }, [isAdmin, authLoading, router]);

  useEffect(() => {
    if (isAdmin) {
      fetchAnalytics();
    }
  }, [isAdmin]);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/t/stats");
      if (!res.ok) throw new Error("Fehler beim Laden");
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-[--muted]">Laden...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-24 md:px-8">
      {/* Header */}
      <div className="mb-12">
        <Link
          href="/admin"
          className="mb-4 inline-block text-sm text-[--muted] transition-colors hover:text-[--primary]"
        >
          ← Zurück zum Dashboard
        </Link>
        <h1 className="font-serif text-4xl font-light text-[--text]">
          Analytics
        </h1>
        <p className="mt-2 text-[--muted]">
          Statistiken der letzten 30 Tage
        </p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-[--muted]">Laden...</div>
      ) : error ? (
        <div className="border border-red-500/30 bg-red-500/10 p-6 text-center text-red-400">
          {error}
        </div>
      ) : data ? (
        <div className="space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KPICard
              title="Besucher"
              value={data.kpis.visitors}
              subtitle="Unique Sessions"
            />
            <KPICard
              title="Seitenaufrufe"
              value={data.kpis.pageviews}
              subtitle="Alle Seiten"
            />
            <KPICard
              title="WhatsApp Klicks"
              value={data.kpis.whatsappClicks}
              subtitle="Kontaktanfragen"
            />
            <KPICard
              title="Ø Sitzungsdauer"
              value={formatDuration(data.kpis.avgSessionDuration)}
              subtitle="Durchschnitt"
            />
          </div>

          {/* Chart */}
          <SimpleBarChart data={data.chartData} />

          {/* Property Stats Table */}
          <div className="border border-[--glass-border] bg-[--card]">
            <div className="border-b border-[--glass-border] px-6 py-4">
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-[--muted]">
                Performance nach Objekt
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[--glass-border] text-left text-xs uppercase tracking-[0.15em] text-[--muted]">
                    <th className="px-6 py-4 font-medium">Objekt</th>
                    <th className="px-6 py-4 font-medium">Typ</th>
                    <th className="px-6 py-4 font-medium text-right">Aufrufe</th>
                    <th className="px-6 py-4 font-medium text-right">WhatsApp</th>
                    <th className="px-6 py-4 font-medium text-right">Konversion</th>
                  </tr>
                </thead>
                <tbody>
                  {data.propertyStats.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-[--muted]">
                        Noch keine Daten vorhanden
                      </td>
                    </tr>
                  ) : (
                    data.propertyStats.map((property) => {
                      const conversionRate =
                        property.pageviews > 0
                          ? ((property.whatsappClicks / property.pageviews) * 100).toFixed(1)
                          : "0.0";

                      return (
                        <tr
                          key={property.id}
                          className="border-b border-[--glass-border]/50 transition-colors hover:bg-[--surface]"
                        >
                          <td className="px-6 py-4">
                            <span className="font-medium text-[--text]">
                              {property.title}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-[--muted]">
                              {formatType(property.type)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="font-mono text-[--text]">
                              {property.pageviews}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="font-mono text-[--primary]">
                              {property.whatsappClicks}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span
                              className={`font-mono ${
                                parseFloat(conversionRate) > 5
                                  ? "text-emerald-400"
                                  : "text-[--muted]"
                              }`}
                            >
                              {conversionRate}%
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Info Box */}
          <div className="border border-[--glass-border] bg-[--surface] p-6">
            <h3 className="font-medium text-[--text]">ℹ️ Über die Daten</h3>
            <ul className="mt-3 space-y-2 text-sm text-[--muted]">
              <li>• Alle Daten sind anonymisiert und DSGVO-konform</li>
              <li>• Besucher werden über gehashte Session-IDs gezählt</li>
              <li>• WhatsApp-Klicks zeigen direkte Kontaktanfragen</li>
              <li>• Konversion = WhatsApp-Klicks ÷ Seitenaufrufe</li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}

