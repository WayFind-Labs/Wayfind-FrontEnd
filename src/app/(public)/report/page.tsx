import type { Metadata } from "next";
import { ReportChildForm } from "@/components/public/ReportChildForm";

export const metadata: Metadata = {
  title: "Report a found child",
  description: "Share information about a child you have found with the shelter team.",
};

export default function ReportPage() {
  return (
    <section className="public-page report-page" aria-labelledby="report-title">
      <div className="public-intro compact">
        <p className="t-label">Found-child report</p>
        <h1 id="report-title" className="t-page">Tell us what you saw</h1>
        <p className="t-body t-muted">Start with the details you remember. You do not need to know every answer before sending a report.</p>
      </div>
      <ReportChildForm />
    </section>
  );
}
