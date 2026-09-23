import Link from "next/link";

const intents = [
  {
    href: "/report",
    title: "I found a child",
    description: "Share what you know so a shelter team can help keep the child safe.",
    tone: "accent",
    icon: <path d="M12 21s-7-4.35-7-10.2A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 7 2.8C19 16.65 12 21 12 21Z" />,
  },
  {
    href: "/chat",
    title: "I'm looking for a missing child",
    description: "Tell us what happened and get guidance on the next steps.",
    tone: "teal",
    icon: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 5 5" /></>,
  },
  {
    href: "/chat",
    title: "I need help / other",
    description: "Ask a question about shelters, services, or using Wayfind.",
    tone: "info",
    icon: <><circle cx="12" cy="12" r="8.5" /><path d="M9.8 9a2.3 2.3 0 1 1 3.8 1.7c-1.1.8-1.6 1.2-1.6 2.4M12 16.5h.01" /></>,
  },
];

export function HomeIntentSelector() {
  return (
    <section className="public-page public-home" aria-labelledby="home-title">
      <div className="public-intro">
        <p className="t-label">Wayfind public support</p>
        <h1 id="home-title" className="t-display">How can we help today?</h1>
        <p className="t-body t-muted">Choose the path that best describes what you need. You can add details in your own words.</p>
      </div>
      <div className="intent-grid">
        {intents.map((intent) => (
          <Link key={intent.title} href={intent.href} className="intent-card">
            <span className={`intent-card-icon ${intent.tone}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {intent.icon}
              </svg>
            </span>
            <span className="intent-card-title">{intent.title}</span>
            <span className="intent-card-desc">{intent.description}</span>
            <span className="intent-card-arrow" aria-hidden="true">&#8594;</span>
          </Link>
        ))}
      </div>
      <p className="public-trust-note">Your information is shared with the shelter team responsible for helping. Only provide details you are comfortable sharing.</p>
    </section>
  );
}
