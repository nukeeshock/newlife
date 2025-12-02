import { put, del } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { withAdminAuth, AuthenticatedRequest } from "@/lib/middleware/admin-auth";
import { checkRateLimit, RATE_LIMITS, rateLimitExceededResponse } from "@/lib/rate-limit";

// ============================================
// BILD-VALIDIERUNG MIT MAGIC BYTES
// ============================================

const IMAGE_MAGIC_BYTES: Record<string, number[][]> = {
  "image/jpeg": [
    [0xff, 0xd8, 0xff], // JPEG SOI marker
  ],
  "image/png": [
    [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], // PNG signature
  ],
  "image/gif": [
    [0x47, 0x49, 0x46, 0x38, 0x37, 0x61], // GIF87a
    [0x47, 0x49, 0x46, 0x38, 0x39, 0x61], // GIF89a
  ],
  "image/webp": [
    [0x52, 0x49, 0x46, 0x46], // RIFF (WebP starts with RIFF)
  ],
};

/**
 * Validiert den Dateityp anhand der Magic Bytes
 */
function validateImageMagicBytes(buffer: ArrayBuffer): string | null {
  const bytes = new Uint8Array(buffer);

  for (const [mimeType, signatures] of Object.entries(IMAGE_MAGIC_BYTES)) {
    for (const signature of signatures) {
      if (signature.every((byte, index) => bytes[index] === byte)) {
        // Für WebP zusätzliche Prüfung (WEBP string bei Offset 8-11)
        if (mimeType === "image/webp") {
          const webpMarker = [0x57, 0x45, 0x42, 0x50]; // "WEBP"
          if (!webpMarker.every((byte, index) => bytes[8 + index] === byte)) {
            continue;
          }
        }
        return mimeType;
      }
    }
  }

  return null;
}

// ============================================
// KONFIGURATION
// ============================================

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_DIMENSION = 2000; // Maximale Breite/Höhe
const WEBP_QUALITY = 85;

// ============================================
// UPLOAD HANDLER
// ============================================

async function uploadHandler(request: AuthenticatedRequest) {
  try {
    // Rate Limiting
    const rateLimit = checkRateLimit(request, RATE_LIMITS.upload);
    if (!rateLimit.success) {
      return rateLimitExceededResponse(rateLimit.resetAt);
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Keine Datei hochgeladen", code: "NO_FILE" },
        { status: 400 }
      );
    }

    // Größenprüfung
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Datei zu groß (max. 10MB)", code: "FILE_TOO_LARGE" },
        { status: 400 }
      );
    }

    // File zu Buffer konvertieren
    const arrayBuffer = await file.arrayBuffer();

    // Magic Bytes validieren
    const detectedType = validateImageMagicBytes(arrayBuffer);
    if (!detectedType) {
      return NextResponse.json(
        {
          error: "Ungültiges Bildformat. Erlaubt: JPEG, PNG, GIF, WebP",
          code: "INVALID_IMAGE_TYPE",
        },
        { status: 400 }
      );
    }

    // Mit Sharp verarbeiten: Resize + WebP-Konvertierung
    let processedBuffer: Buffer;
    
    try {
      const image = sharp(Buffer.from(arrayBuffer));
      const metadata = await image.metadata();

      // Resize wenn größer als MAX_DIMENSION
      if (
        (metadata.width && metadata.width > MAX_DIMENSION) ||
        (metadata.height && metadata.height > MAX_DIMENSION)
      ) {
        image.resize(MAX_DIMENSION, MAX_DIMENSION, {
          fit: "inside",
          withoutEnlargement: true,
        });
      }

      // Zu WebP konvertieren
      processedBuffer = await image
        .webp({ quality: WEBP_QUALITY })
        .toBuffer();
    } catch (sharpError) {
      console.error("[SHARP_ERROR]", sharpError);
      return NextResponse.json(
        { error: "Fehler bei der Bildverarbeitung", code: "IMAGE_PROCESSING_ERROR" },
        { status: 500 }
      );
    }

    // Eindeutiger Dateiname mit .webp Extension
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 8);
    const filename = `properties/${timestamp}-${randomId}.webp`;

    // Upload zu Vercel Blob
    const blob = await put(filename, processedBuffer, {
      access: "public",
      contentType: "image/webp",
    });

    return NextResponse.json({
      url: blob.url,
      size: processedBuffer.length,
      format: "webp",
    });
  } catch (error) {
    console.error("[UPLOAD_ERROR]", error);
    return NextResponse.json(
      { error: "Upload fehlgeschlagen", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

// ============================================
// DELETE HANDLER (für alte Bilder)
// ============================================

async function deleteHandler(request: AuthenticatedRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL ist erforderlich", code: "VALIDATION_ERROR" },
        { status: 400 }
      );
    }

    // Nur Vercel Blob URLs erlauben
    if (!url.includes("vercel-storage.com") && !url.includes("blob.vercel-storage.com")) {
      return NextResponse.json(
        { error: "Ungültige Blob-URL", code: "INVALID_URL" },
        { status: 400 }
      );
    }

    await del(url);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE_BLOB_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler beim Löschen", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

export const POST = withAdminAuth(uploadHandler);
export const DELETE = withAdminAuth(deleteHandler);
