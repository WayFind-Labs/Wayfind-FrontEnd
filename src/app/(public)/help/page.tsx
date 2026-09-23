import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Help",
};

export default function HelpPage() {
  return (
    <section className="info-page" aria-labelledby="help-title">
      <div className="info-page-header"><p className="t-label">Wayfind information</p><h1 id="help-title" className="t-page">Help and guidance</h1><p className="t-body t-muted">Learn how Wayfind can help with found-child intake and missing-child searches.</p></div>
      <div className="info-link-list">
        <Link href="/faq" className="info-link"><span><strong>Frequently asked questions</strong><small>How the assistant, shelters, and reports work</small></span><span aria-hidden="true">&#8594;</span></Link>
        <Link href="/contact" className="info-link"><span><strong>Contact us</strong><small>Send a question or feedback to the Wayfind team</small></span><span aria-hidden="true">&#8594;</span></Link>
        <Link href="/privacy" className="info-link"><span><strong>Privacy policy</strong><small>How we handle information shared with Wayfind</small></span><span aria-hidden="true">&#8594;</span></Link>
        <Link href="/terms" className="info-link"><span><strong>Terms and conditions</strong><small>Rules for using this service</small></span><span aria-hidden="true">&#8594;</span></Link>
      </div>
      <div className="info-note"><strong>Immediate safety concern?</strong><p>Contact local emergency services or a trusted child-protection authority. Wayfind does not replace emergency response.</p></div>
    </section>
  );
}
