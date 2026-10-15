"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ImagePlus, LoaderCircle } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { resolveImageUrl } from "@/lib/image-url";

type UploadFolder = "counsellors" | "services";

interface Props {
  label: string;
  folder: UploadFolder;
  value?: string | null;
  onChange: (path: string) => void;
}

interface UploadResponse {
  path: string;
  filename: string;
  format: "webp";
  size?: number;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "image/bmp",
];

function convertImageToWebp(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new window.Image();

    const cleanup = () => {
      URL.revokeObjectURL(objectUrl);
    };

    image.onload = () => {
      try {
        if (!image.naturalWidth || !image.naturalHeight) {
          cleanup();
          reject(new Error("Invalid image dimensions."));
          return;
        }

        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        const context = canvas.getContext("2d");

        if (!context) {
          cleanup();
          reject(new Error("Unable to process this image."));
          return;
        }

        context.drawImage(image, 0, 0);

        canvas.toBlob(
          (blob) => {
            cleanup();

            if (!blob || blob.type !== "image/webp") {
              reject(new Error("WebP conversion failed."));
              return;
            }

            resolve(blob);
          },
          "image/webp",
          0.86,
        );
      } catch {
        cleanup();
        reject(new Error("Unable to convert this image."));
      }
    };

    image.onerror = () => {
      cleanup();
      reject(
        new Error(
          "This image format is unsupported or the image file is invalid.",
        ),
      );
    };

    image.src = objectUrl;
  });
}

export default function ImageUploadField({
  label,
  folder,
  value,
  onChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file?: File) {
    if (!file) return;

    setError("");

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("Please select JPG, PNG, WebP, GIF, AVIF, or BMP.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Image must be 5 MB or smaller.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setUploading(true);

    try {
      const webp = await convertImageToWebp(file);
      const formData = new FormData();

      const filename =
        file.name.replace(/\.[^.]+$/, "") || "image";

      formData.append("image", webp, `${filename}.webp`);
      formData.append("folder", folder);

      const result = await apiClient.upload<UploadResponse>(
        "/uploads/image",
        formData,
      );

      onChange(result.path);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Image upload failed.",
      );
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
<div className="sm:col-span-1">
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="flex flex-col gap-3 rounded-xl border border-dashed border-slate-300 p-4 sm:flex-row sm:items-center">
        {value ? (
          <Image
            src={resolveImageUrl(value)}
            alt={`${label} preview`}
            width={96}
            height={96}
            unoptimized
            className="h-24 w-24 rounded-lg border border-slate-200 object-cover"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
            <ImagePlus className="h-7 w-7" />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-700">
            {value ? "Image selected" : "Upload an image"}
          </p>

          <p className="mt-1 break-all text-xs text-slate-500">
            {value ||
              " Max 5 MB "}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-lg bg-[#238BE6] px-3 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {uploading ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <ImagePlus className="h-4 w-4" />
              )}

              {uploading
                ? "Uploading..."
                : value
                  ? "Replace image"
                  : "Choose image"}
            </button>

            {value && (
              <button
                type="button"
                disabled={uploading}
                onClick={() => {
                  setError("");
                  onChange("");
                }}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 disabled:opacity-60"
              >
                Remove selection
              </button>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept={ALLOWED_IMAGE_TYPES.join(",")}
            className="hidden"
            disabled={uploading}
            onChange={(event) => {
              void handleFile(event.target.files?.[0]);
            }}
          />

          {error && (
            <p role="alert" className="mt-2 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}