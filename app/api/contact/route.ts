import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  validate,
  formatZodErrors,
  contactFormSchema,
} from "@/lib/validations";
import {
  checkRateLimit,
  rateLimitExceededResponse,
  RATE_LIMITS,
  getClientIP,
} from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    // Rate Limiting
    const rateLimit = checkRateLimit(request, RATE_LIMITS.contact);
    if (!rateLimit.success) {
      return rateLimitExceededResponse(rateLimit.resetAt);
    }

    // Body parsen
    const body = await request.json();

    // Validierung
    const validation = validate(contactFormSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Ungültige Eingabe",
          code: "VALIDATION_ERROR",
          details: formatZodErrors(validation.errors),
        },
        { status: 400 }
      );
    }

    const { name, email, phone, message, propertyId, website } = validation.data;

    // Honeypot-Check: Wenn website ausgefüllt = Bot
    if (website) {
      console.warn("[CONTACT_BOT_DETECTED]", getClientIP(request));
      // Fake-Success zurückgeben um Bot nicht zu warnen (identisch zur echten Response)
      const fakeId = `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 9)}`;
      return NextResponse.json(
        {
          success: true,
          message: "Ihre Anfrage wurde erfolgreich gesendet",
          id: fakeId,
        },
        {
          status: 201,
          headers: {
            "X-RateLimit-Remaining": String(rateLimit.remaining),
          },
        }
      );
    }

    // Optional: Property-ID validieren
    if (propertyId) {
      const property = await prisma.property.findUnique({
        where: { id: propertyId },
        select: { id: true },
      });

      if (!property) {
        return NextResponse.json(
          {
            error: "Die angegebene Immobilie wurde nicht gefunden",
            code: "PROPERTY_NOT_FOUND",
          },
          { status: 400 }
        );
      }
    }

    // Kontaktanfrage speichern
    const inquiry = await prisma.contactInquiry.create({
      data: {
        name,
        email,
        phone,
        message,
        propertyId: propertyId || null,
      },
    });

    // Response
    return NextResponse.json(
      {
        success: true,
        message: "Ihre Anfrage wurde erfolgreich gesendet",
        id: inquiry.id,
      },
      {
        status: 201,
        headers: {
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      }
    );
  } catch (error) {
    console.error("[CONTACT_ERROR]", error);
    return NextResponse.json(
      {
        error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}
