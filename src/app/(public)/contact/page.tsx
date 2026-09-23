"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [result, setResult] = useState<"" | "sending" | "success" | "error">("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult("sending");
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "2547b73e-b89c-47be-909f-4d21aa7b41b4");
    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = (await response.json()) as { success?: boolean };
      setResult(data.success ? "success" : "error");
      if (data.success) form.reset();
    } catch {
      setResult("error");
    }
  }

  return <section className="info-page contact-page" aria-labelledby="contact-title"><div className="info-page-header"><p className="t-label">Wayfind team</p><h1 id="contact-title" className="t-page">Contact us</h1><p className="t-body t-muted">Send a question, feedback, or a concern about using Wayfind.</p></div><form className="contact-form" onSubmit={onSubmit}><div className="field-group"><label className="field-label" htmlFor="contact-name">Name</label><input className="text-input" id="contact-name" name="name" type="text" required /></div><div className="field-group"><label className="field-label" htmlFor="contact-email">Email</label><input className="text-input" id="contact-email" name="email" type="email" required /></div><div className="field-group"><label className="field-label" htmlFor="contact-message">Message</label><textarea className="text-input contact-message" id="contact-message" name="message" rows={6} required /></div><button className="btn btn-primary" type="submit" disabled={result === "sending"}>{result === "sending" ? "Sending..." : "Send message"}</button>{result === "success" && <p className="form-feedback success">Your message was sent.</p>}{result === "error" && <p className="form-feedback error">We could not send your message. Please try again.</p>}</form></section>;
}
