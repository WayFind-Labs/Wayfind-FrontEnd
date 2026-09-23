export function LocationInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="field-group">
      <label className="field-label" htmlFor="found-child-location">Where are you now? <span className="t-muted-2">Optional</span></label>
      <input id="found-child-location" className="text-input" value={value} onChange={(event) => onChange(event.target.value)} placeholder="A landmark, neighborhood, or shelter name" />
      <p className="t-small">Share only a place description you are comfortable providing. We do not collect your precise location automatically.</p>
    </div>
  );
}
