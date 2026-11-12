"use client";

import { useState } from "react";

interface InlineCaseReviewCardProps {
  caseReference: string;
  confidenceTier?: string;
}

export function InlineCaseReviewCard({
  caseReference,
  confidenceTier,
}: InlineCaseReviewCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(caseReference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API unavailable
    }
  };

  return (
    <div className="inline-review-card">
      <div className="inline-review-top">
        <div className="inline-review-badge">
          <span className="pulse-dot" />
          <span>Under Shelter Staff Review</span>
        </div>
        {confidenceTier && (
          <span className="tier-tag">Confidence: {confidenceTier}</span>
        )}
      </div>

      <p className="inline-review-desc">
        A potential match has been flagged and is being verified by shelter operations.
        Keep this case reference number to track updates:
      </p>

      <div className="case-reference-box">
        <span className="case-ref-text">{caseReference}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="btn btn-secondary btn-sm copy-btn"
          aria-label="Copy case reference"
        >
          {copied ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      <p className="inline-review-footer">
        Our team will contact you once verification is complete. You do not need to resubmit.
      </p>

      <div style={{ marginTop: "12px", padding: "10px 12px", background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.25)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "16px" }}>🆘</span>
          <span style={{ fontSize: "12px", color: "var(--ink)", fontWeight: 500 }}>
            Child Emergency Helpline: <strong>1098</strong>
          </span>
        </div>
        <a
          href="tel:1098"
          className="btn btn-sm btn-error"
          style={{ fontSize: "11px", padding: "3px 10px", height: "auto" }}
        >
          Call 1098
        </a>
      </div>
    </div>
  );
}
