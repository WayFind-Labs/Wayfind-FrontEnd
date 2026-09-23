import { ChangeEvent, DragEvent, useState } from "react";
import type { ImageAttachment } from "@/types/public";

export function ImageUpload({ images, onAdd, onRemove }: { images: ImageAttachment[]; onAdd: (files: File[]) => void; onRemove: (fileName: string) => void }) {
  const [dragging, setDragging] = useState(false);

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) onAdd(Array.from(event.target.files));
    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    onAdd(Array.from(event.dataTransfer.files));
  }

  return (
    <section className="field-group" aria-labelledby="image-upload-title">
      <div><label id="image-upload-title" className="field-label">Add a photo <span className="t-muted-2">Optional</span></label><p className="t-small">A clear photo can help the shelter team understand the situation.</p></div>
      <label className={`upload-zone-wrap upload-zone${dragging ? " drag-over" : ""}`} onDragEnter={() => setDragging(true)} onDragLeave={() => setDragging(false)} onDragOver={(event) => event.preventDefault()} onDrop={handleDrop}>
        <input type="file" accept="image/*" capture="environment" multiple onChange={handleFiles} aria-label="Choose or take a photo" />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true"><path d="M4 7h3l1.5-2h7L17 7h3v12H4V7Z" /><circle cx="12" cy="13" r="3.5" /></svg>
        <strong>Drop a photo here or tap to choose</strong>
        <span className="t-small">Camera capture is available on supported devices</span>
      </label>
      <p className="safety-notice"><span aria-hidden="true">!</span><span>Your image will be safety-checked before processing.</span></p>
      {images.length > 0 && <div className="photo-list">{images.map((image) => <div className="photo-thumb" key={image.fileName}><img src={image.previewUrl} alt="Selected report photo" /><button className="photo-thumb-remove" type="button" onClick={() => onRemove(image.fileName)} aria-label={`Remove ${image.fileName}`}>x</button></div>)}</div>}
    </section>
  );
}
