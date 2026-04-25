"use client";

import { useCallback, useState } from "react";
import { X, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { FieldLabel } from "../ui/field";

const MAX_IMAGES = 6;

export function ImageGalleryUpload({ images, onChange }) {
  const [isDragging, setIsDragging] = useState(false);

  const addImage = useCallback(
    (file) => {
      if (!file || !file.type.startsWith("image/")) return;
      if (images.length >= MAX_IMAGES) return;

      const url = URL.createObjectURL(file);
      const newImage = { id: crypto.randomUUID(), url, file, alt: file.name };
      onChange([...images, newImage]);
    },
    [images, onChange],
  );

  const removeImage = useCallback(
    (id) => onChange(images.filter((img) => img.id !== id)),
    [images, onChange],
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) addImage(file);
    },
    [addImage],
  );

  const handleInputChange = useCallback(
    (e) => {
      const files = Array.from(e.target.files || []);
      const remaining = MAX_IMAGES - images.length;

      const newImages = files
        .slice(0, remaining)
        .filter((file) => file.type.startsWith("image/"))
        .map((file) => ({
          id: crypto.randomUUID(),
          url: URL.createObjectURL(file),
          file,
          alt: file.name,
        }));

      onChange([...images, ...newImages]);
      e.target.value = "";
    },
    [images, onChange],
  );

  const isFull = images.length >= MAX_IMAGES;

  return (
    <div className="flex flex-col gap-3">
      {/* hidden input สำหรับส่งไป Server Action */}
      {images.map(
        (image, index) =>
          image.file && (
            <input
              key={image.id}
              type="file"
              name={`images[${index}]`}
              className="hidden"
              ref={(el) => {
                if (el) {
                  const dt = new DataTransfer();
                  dt.items.add(image.file);
                  el.files = dt.files;
                }
              }}
            />
          ),
      )}

      {/* Counter */}
      <div className="flex items-center justify-between">
        <FieldLabel>Upload gallery images</FieldLabel>
        <span className="text-sm font-medium">
          {images.length} / {MAX_IMAGES}
        </span>
      </div>

      {/* Upload Zone */}
      {!isFull && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
          className={cn(
            "relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50",
          )}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleInputChange}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
          <div className="rounded-full bg-muted p-3">
            <ImageIcon className="size-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            Drop an image or click to upload
          </p>
          <p className="text-xs text-muted-foreground">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      )}

      {/* Grid รูปที่ upload แล้ว */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-video overflow-hidden rounded-lg border"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="size-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(image.id)}
                className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
