"use client";

import { useState } from "react";

interface InlineFormCardProps {
  fields: string[];
  submitted?: boolean;
  onSubmit: (formData: Record<string, unknown>) => Promise<void>;
}

const FIELD_LABELS: Record<string, { label: string; placeholder: string; type: "text" | "number" | "select" | "radio"; options?: string[] }> = {
  gender: {
    label: "Gender",
    placeholder: "Select gender",
    type: "radio",
    options: ["Male", "Female", "Other"],
  },
  age: {
    label: "Age (Years)",
    placeholder: "e.g. 7",
    type: "number",
  },
  last_seen_location: {
    label: "Last Seen Location",
    placeholder: "e.g. Near City Center, Gate 2",
    type: "text",
  },
  found_location: {
    label: "Found Location",
    placeholder: "e.g. Main Plaza bus stop",
    type: "text",
  },
  clothing: {
    label: "Clothing Description",
    placeholder: "e.g. Blue hoodie, grey sneakers",
    type: "text",
  },
  hair_color: {
    label: "Hair Color",
    placeholder: "e.g. Black / Brown",
    type: "text",
  },
  eye_color: {
    label: "Eye Color",
    placeholder: "e.g. Dark brown",
    type: "text",
  },
  height_cm: {
    label: "Approx. Height (cm)",
    placeholder: "e.g. 120",
    type: "number",
  },
  identifying_features: {
    label: "Distinguishing Features / Marks",
    placeholder: "e.g. Birthmark on left cheek, glasses",
    type: "text",
  },
};

export function InlineFormCard({ fields, submitted, onSubmit }: InlineFormCardProps) {
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [unknownFlags, setUnknownFlags] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(submitted || false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleValueChange = (field: string, val: string) => {
    setFormValues((prev) => ({ ...prev, [field]: val }));
  };

  const handleToggleUnknown = (field: string) => {
    setUnknownFlags((prev) => {
      const nextVal = !prev[field];
      return { ...prev, [field]: nextVal };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const payload: Record<string, unknown> = {};
    for (const field of fields) {
      if (unknownFlags[field]) {
        payload[field] = null;
      } else {
        const val = formValues[field]?.trim();
        if (!val) {
          payload[field] = null;
        } else if (FIELD_LABELS[field]?.type === "number") {
          const num = Number(val);
          payload[field] = isNaN(num) ? val : num;
        } else {
          payload[field] = val;
        }
      }
    }

    try {
      await onSubmit(payload);
      setHasSubmitted(true);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to submit. Please retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasSubmitted) {
    return (
      <div className="inline-form-card submitted">
        <div className="inline-form-success">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Details submitted to assistant</span>
        </div>
      </div>
    );
  }

  return (
    <form className="inline-form-card" onSubmit={handleSubmit}>
      <div className="inline-form-header">
        <p className="inline-form-title">Requested Information</p>
        <span className="inline-form-hint">Fill in known details or tap &quot;Don&apos;t know&quot;</span>
      </div>

      <div className="inline-form-fields">
        {fields.map((field) => {
          const meta = FIELD_LABELS[field] || {
            label: field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
            placeholder: `Enter ${field.replace(/_/g, " ")}`,
            type: "text",
          };
          const isUnknown = !!unknownFlags[field];
          const val = formValues[field] || "";

          return (
            <div key={field} className={`inline-field-group ${isUnknown ? "is-unknown" : ""}`}>
              <div className="inline-field-top">
                <label className="inline-field-label">{meta.label}</label>
                <button
                  type="button"
                  className={`unknown-toggle-btn ${isUnknown ? "active" : ""}`}
                  onClick={() => handleToggleUnknown(field)}
                >
                  {isUnknown ? "✓ Don't know" : "Don't know"}
                </button>
              </div>

              {meta.type === "radio" && meta.options ? (
                <div className="inline-radio-group">
                  {meta.options.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      disabled={isUnknown}
                      className={`inline-choice-btn ${val === opt.toLowerCase() ? "selected" : ""}`}
                      onClick={() => handleValueChange(field, opt.toLowerCase())}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  type={meta.type === "number" ? "number" : "text"}
                  placeholder={isUnknown ? "Marked as unknown" : meta.placeholder}
                  disabled={isUnknown}
                  value={isUnknown ? "" : val}
                  onChange={(e) => handleValueChange(field, e.target.value)}
                  className="inline-text-input"
                />
              )}
            </div>
          );
        })}
      </div>

      {errorMessage && <p className="inline-form-error">{errorMessage}</p>}

      <button type="submit" disabled={isSubmitting} className="btn btn-primary inline-submit-btn">
        {isSubmitting ? "Submitting..." : "Send Details to Assistant"}
      </button>
    </form>
  );
}
