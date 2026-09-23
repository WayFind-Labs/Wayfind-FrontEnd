export function PromptInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="field-group report-prompt-area">
      <label className="field-label" htmlFor="found-child-description">What happened?</label>
      <textarea id="found-child-description" className="text-input" value={value} onChange={(event) => onChange(event.target.value)} placeholder="For example: I found a young child near the bus station this morning..." maxLength={1000} />
      <span className="report-prompt-chars" aria-live="polite">{value.length}/1000</span>
    </div>
  );
}
