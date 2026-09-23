import { FormEvent, useState } from "react";

export function MessageInput({ onSend, disabled = false }: { onSend: (message: string) => void; disabled?: boolean }) {
  const [value, setValue] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = value.trim();
    if (!message || disabled) return;
    onSend(message);
    setValue("");
  }

  return (
    <form className="message-composer" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="chat-message">Message Wayfind</label>
      <input id="chat-message" className="text-input" value={value} onChange={(event) => setValue(event.target.value)} placeholder="Tell us what you need" disabled={disabled} />
      <button className="btn btn-primary" type="submit" disabled={disabled || !value.trim()} aria-label="Send message">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m4 4 16 8-16 8 3-8-3-8Z" /><path d="M7 12h13" /></svg>
        <span>Send</span>
      </button>
    </form>
  );
}
