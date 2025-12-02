import { NextRequest, NextResponse } from "next/server";

// Sentry Tunnel - leitet Requests über eigenen Server um Ad-Blocker zu umgehen
const SENTRY_HOST = "o4510467287810048.ingest.de.sentry.io";
const SENTRY_PROJECT_ID = "4510467289251920";

export async function POST(request: NextRequest) {
  try {
    const envelope = await request.text();
    const pieces = envelope.split("\n");
    
    // Header parsen
    const header = JSON.parse(pieces[0]);
    const dsn = new URL(header.dsn);
    const projectId = dsn.pathname.replace("/", "");

    // Sicherheitscheck: Nur unser Projekt erlauben
    if (projectId !== SENTRY_PROJECT_ID) {
      return NextResponse.json({ error: "Invalid project" }, { status: 403 });
    }

    // An Sentry weiterleiten
    const response = await fetch(`https://${SENTRY_HOST}/api/${projectId}/envelope/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-sentry-envelope",
      },
      body: envelope,
    });

    return new NextResponse(response.body, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("[SENTRY_TUNNEL_ERROR]", error);
    return NextResponse.json({ error: "Tunnel error" }, { status: 500 });
  }
}


