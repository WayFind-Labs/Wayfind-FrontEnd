"use client";

import { FormEvent, useState } from "react";
import type { FoundChildReport, FollowUpQuestion, ImageAttachment } from "@/types/public";
import { FollowUpQuestions } from "./FollowUpQuestions";
import { ImageUpload } from "./ImageUpload";
import { LocationInput } from "./LocationInput";
import { PromptInput } from "./PromptInput";

const questions: FollowUpQuestion[] = [
  { id: "age", question: "About how old does the child seem?", hint: "An estimate is okay", required: false },
  { id: "appearance", question: "What are they wearing or carrying?", hint: "Colors, clothing, or belongings", required: false },
];

export function ReportChildForm() {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<ImageAttachment[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function addFiles(files: File[]) {
    setImages((current) => [...current, ...files.filter((file) => file.type.startsWith("image/")).map((file) => ({ previewUrl: URL.createObjectURL(file), fileName: file.name, sizeBytes: file.size, uploaded: false }))]);
  }

  function removeImage(fileName: string) {
    setImages((current) => current.filter((image) => image.fileName !== fileName));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!prompt.trim()) return;
    const report: FoundChildReport = { initialPrompt: prompt.trim(), followUpAnswers: answers, images, locationDescription: location.trim() || undefined, status: "submitted", submittedAt: new Date().toISOString() };
    void report;
    setSubmitted(true);
  }

  if (submitted) {
    return <section className="report-success card" aria-labelledby="report-success-title"><span className="success-mark" aria-hidden="true">&#10003;</span><h2 id="report-success-title" className="t-page">Your report is ready for the shelter team</h2><p className="t-body t-muted">Keep this page open if a support worker needs to ask a follow-up question. Do not share photos publicly.</p><button className="btn btn-secondary" type="button" onClick={() => setSubmitted(false)}>Add another report</button></section>;
  }

  return (
    <form className="report-form" onSubmit={submit}>
      <PromptInput value={prompt} onChange={setPrompt} />
      {prompt.trim().length >= 20 && <FollowUpQuestions questions={questions} answers={answers} onAnswer={(id, value) => setAnswers((current) => ({ ...current, [id]: value }))} />}
      <ImageUpload images={images} onAdd={addFiles} onRemove={removeImage} />
      <LocationInput value={location} onChange={setLocation} />
      <button className="btn btn-primary report-submit" type="submit" disabled={!prompt.trim()}>Send report to the shelter team</button>
    </form>
  );
}
