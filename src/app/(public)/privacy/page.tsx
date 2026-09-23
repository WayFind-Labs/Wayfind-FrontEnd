import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return <section className="info-page legal-page" aria-labelledby="privacy-title"><div className="info-page-header"><p className="t-label">Your information</p><h1 id="privacy-title" className="t-page">Privacy policy</h1><p className="t-small">Last updated: September 23, 2026</p></div><div className="legal-copy"><h2>What we collect</h2><p>Wayfind receives the prompts and contact details you choose to provide. Only share information needed to help with a found-child or missing-child situation.</p><h2>How we use information</h2><p>Your information is used to route your request to the appropriate child-safety workflow and authorized support team. We do not present unverified identity matches to public users.</p><h2>Safety and sharing</h2><p>Information may be shared with authorized child-protection or shelter staff when needed to respond to your request. Backend safety controls govern processing, access, and retention.</p><h2>Your choices</h2><p>You can avoid including details you are not comfortable sharing. To ask about a submission or privacy request, contact the Wayfind team through the contact page.</p></div></section>;
}
