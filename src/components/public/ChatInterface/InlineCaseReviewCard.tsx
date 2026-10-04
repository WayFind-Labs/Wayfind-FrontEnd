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
    </div>
  );
}
