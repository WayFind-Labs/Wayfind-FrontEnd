import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms and conditions" };

export default function TermsPage() {
  return <section className="info-page legal-page" aria-labelledby="terms-title"><div className="info-page-header"><p className="t-label">Using Wayfind</p><h1 id="terms-title" className="t-page">Terms and conditions</h1><p className="t-small">Last updated: September 23, 2026</p></div><div className="legal-copy"><h2>Use the service responsibly</h2><p>Use Wayfind for genuine child-safety, found-child intake, missing-child, and authorized shelter-routing needs. Do not submit misleading, abusive, or knowingly false information.</p><h2>Not an emergency service</h2><p>Wayfind does not replace emergency services, law enforcement, medical care, or a child-protection authority. Contact the appropriate local authority when someone is in immediate danger.</p><h2>Information and guidance</h2><p>Wayfind provides assistance and routing based on the information available to the service. Follow-up actions and final decisions belong to authorized human teams.</p><h2>Acceptable submissions</h2><p>Share only information you have a right to provide. Do not use the service to publish private information publicly or to identify a child outside an authorized process.</p></div></section>;
}
