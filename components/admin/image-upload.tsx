"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export function ImageUpload({ images, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");

    const newImages: string[] = [];

    for (const file of Array.from(files)) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Upload fehlgeschlagen");
        }

        newImages.push(data.url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload fehlgeschlagen");
      }
    }

    if (newImages.length > 0) {
      onChange([...images, ...newImages]);
    }

    setUploading(false);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const moveImage = (index: number, direction: "up" | "down") => {
    const newImages = [...images];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= images.length) return;
    [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center border-2 border-dashed border-[--glass-border] bg-[--surface] p-8 transition-colors hover:border-[--primary]/50 ${
          uploading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
        <div className="text-center">
          <div className="text-3xl text-[--muted]">📷</div>
          <p className="mt-2 text-sm text-[--muted]">
            {uploading ? "Wird hochgeladen..." : "Klicken oder Dateien hierher ziehen"}
          </p>
          <p className="mt-1 text-xs text-[--muted]/60">
            JPG, PNG, WebP • Max. 10MB pro Bild
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((url, index) => (
            <div key={`${url}-${index}`} className="group relative aspect-video overflow-hidden border border-[--glass-border] bg-[--card]">
              <Image
                src={url}
                alt={`Bild ${index + 1}`}
                fill
                className="object-cover"
                sizes="200px"
              />
              
              {/* Overlay mit Aktionen */}
              <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => moveImage(index, "up")}
                    className="flex h-8 w-8 items-center justify-center bg-[--glass] text-[--text] backdrop-blur hover:bg-[--glass-hover]"
                    title="Nach vorne"
                  >
                    ←
                  </button>
                )}
                {index < images.length - 1 && (
                  <button
                    type="button"
                    onClick={() => moveImage(index, "down")}
                    className="flex h-8 w-8 items-center justify-center bg-[--glass] text-[--text] backdrop-blur hover:bg-[--glass-hover]"
                    title="Nach hinten"
                  >
                    →
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="flex h-8 w-8 items-center justify-center bg-red-500/80 text-white hover:bg-red-500"
                  title="Entfernen"
                >
                  ✕
                </button>
              </div>

              {/* Badge für erstes Bild */}
              {index === 0 && (
                <div className="absolute left-2 top-2 bg-[--primary] px-2 py-0.5 text-xs font-medium text-[--bg]">
                  Titelbild
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

