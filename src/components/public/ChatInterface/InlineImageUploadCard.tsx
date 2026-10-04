"use client";

import { useRef, useState } from "react";
import { uploadImage } from "@/lib/api/client";

interface InlineImageUploadCardProps {
  onImageUploaded: (mediaId: string) => Promise<void>;
}

export function InlineImageUploadCard({ onImageUploaded }: InlineImageUploadCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file (JPG, PNG, WebP).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("Image file exceeds the 10MB limit.");
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
    setIsUploading(true);
    setErrorMessage(null);

    try {
      const { mediaId } = await uploadImage(file);
      await onImageUploaded(mediaId);
      setHasUploaded(true);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  if (hasUploaded) {
    return (
      <div className="inline-image-card uploaded">
        <div className="inline-form-success">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Photo attached and analyzed</span>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-image-card">
      <div className="inline-image-header">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" className="inline-image-icon">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
        <div>
          <p className="inline-image-title">Attach Photo for Matching</p>
          <span className="inline-image-sub">A clear photo significantly improves match accuracy</span>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg,image/png,image/webp"
        capture="environment"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {previewUrl && (
        <div className="inline-image-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="Preview" className="preview-img" />
        </div>
      )}

      {errorMessage && <p className="inline-form-error">{errorMessage}</p>}

      <button
        type="button"
        disabled={isUploading}
        onClick={() => fileInputRef.current?.click()}
        className="btn btn-secondary inline-upload-btn"
      >
        {isUploading ? (
          <>
            <span className="processing-dot" /> Uploading & scanning photo...
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Choose or Capture Photo
          </>
        )}
      </button>
    </div>
  );
}
