import type { Metadata } from "next";

export const metadata: Metadata = { title: "FAQ" };

const questions = [
  ["What can I ask Wayfind?", "You can tell Wayfind that you found a child, are looking for a missing child, or need to find an authorized child-intake shelter. Start in your own words and the service will guide the next step."],
  ["What is a Wayfind shelter?", "A Wayfind shelter is an authorized child-care or child-intake location where a child can be safely brought or information can be submitted to trained staff. Wayfind is not a general housing or local-assistance directory."],
  ["Can Wayfind confirm a match?", "No. Public users will not receive an unverified identity match. Any potential match must be reviewed through the appropriate child-protection process."],
  ["What should I do in an emergency?", "Contact local emergency services or a trusted child-protection authority immediately. Wayfind does not replace emergency response."],
  ["How is my message handled?", "Your prompt is sent to the Wayfind support service. The backend determines the appropriate workflow and applies its safety and privacy controls."],
];

export default function FaqPage() {
  return <section className="info-page" aria-labelledby="faq-title"><div className="info-page-header"><p className="t-label">Answers</p><h1 id="faq-title" className="t-page">Frequently asked questions</h1><p className="t-body t-muted">A short guide to using Wayfind safely.</p></div><div className="faq-list">{questions.map(([question, answer]) => <details className="faq-item" key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>;
}
