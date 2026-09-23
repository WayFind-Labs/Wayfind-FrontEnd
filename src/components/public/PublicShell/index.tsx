"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

/**
 * PublicShell
 *
 * Mobile-first layout shell for the public user experience.
 * - Sticky topbar with Wayfind branding
 * - Scrollable content area
 * - Fixed bottom tab bar (Home · Report · Chat) — matches design SKILL.md mobile pattern
 */
export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 9.5L12 3l9 6.5V21H3V9.5z" />
          <path d="M9 21V13h6v8" />
        </svg>
      ),
    },
    {
      href: "/report",
      label: "Report",
      active: pathname.startsWith("/report"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
      ),
    },
    {
      href: "/chat",
      label: "Search",
      active: pathname.startsWith("/chat"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      ),
    },
  ];

  return (
    <div className="public-shell">
      {/* Skip link for accessibility */}
      <a className="skip-link" href="#main-content">Skip to content</a>

      {/* Top bar */}
      <header className="public-topbar" role="banner">
        {pathname !== "/" ? (
          <button className="public-back" type="button" onClick={() => router.back()} aria-label="Go back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        ) : <span className="public-back-placeholder" aria-hidden="true" />}
        <div className="public-topbar-brand">
          {/* Wayfind geometric badge mark — inline SVG, no icon library */}
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="4" fill="var(--teal)" />
            <path d="M7 12l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Wayfind</span>
        </div>

        {/* Help link */}
        <Link
          href="/help"
          className="btn btn-ghost btn-sm"
          aria-label="Help and guidance"
        >
          Help
        </Link>
      </header>

      {/* Main scrollable content */}
      <main id="main-content" className="public-content" tabIndex={-1}>
        {children}
      </main>

      {/* Bottom tab bar */}
      <nav className="public-bottombar" aria-label="Main navigation">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            id={`tab-${tab.label.toLowerCase()}`}
            className={`public-tab${tab.active ? " active" : ""}`}
            aria-current={tab.active ? "page" : undefined}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
