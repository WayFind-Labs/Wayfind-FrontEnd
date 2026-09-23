"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { usePwa } from "@/hooks/use-pwa";

/**
 * PublicShell
 *
 * Mobile-first layout shell for the public user experience.
 * - Sticky topbar with Wayfind branding
 * - Scrollable content area
 * - Focused top bar with one expandable help menu
 */
export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isInstalled, triggerInstall } = usePwa();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const helpMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsHelpOpen(false);
  }, [pathname]);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (helpMenuRef.current && !helpMenuRef.current.contains(event.target as Node)) setIsHelpOpen(false);
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  return (
    <div className="public-shell">
      {/* Skip link for accessibility */}
      <a className="skip-link" href="#main-content">Skip to content</a>

      {/* Top bar */}
      <header className="public-topbar" role="banner">
        <div className="public-topbar-row">
          <div className="public-topbar-start">{pathname !== "/" ? <button className="public-back" type="button" onClick={() => router.back()} aria-label="Go back"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg></button> : <span className="public-back-placeholder" aria-hidden="true" />}</div>
          <div className="public-topbar-brand">
            <Image src="/icons/WayFindLogo.jpg" alt="" width={36} height={36} priority />
            <span className="public-topbar-brand-copy"><strong>Wayfind</strong><small>Child safety assistant</small></span>
          </div>
          <div className="public-topbar-actions" ref={helpMenuRef}>
            {!isInstalled && <button className="install-header-action" type="button" onClick={() => void triggerInstall()}><span aria-hidden="true">↓</span><span>Install app</span></button>}
            <button className="help-menu-trigger" type="button" onClick={() => setIsHelpOpen((open) => !open)} aria-expanded={isHelpOpen} aria-haspopup="menu">
              <span>Help</span><span className="help-menu-chevron" aria-hidden="true">⌄</span>
            </button>
            {isHelpOpen && <div className="help-menu" role="menu">
              <div className="help-menu-heading">Wayfind support</div>
              <Link href="/faq" className="help-menu-item" role="menuitem"><span className="help-menu-item-icon" aria-hidden="true">?</span><span><strong>FAQ</strong><small>Common questions</small></span></Link>
              <Link href="/contact" className="help-menu-item" role="menuitem"><span className="help-menu-item-icon" aria-hidden="true">@</span><span><strong>Contact us</strong><small>Send a message</small></span></Link>
              <Link href="/privacy" className="help-menu-item" role="menuitem"><span className="help-menu-item-icon" aria-hidden="true">◌</span><span><strong>Privacy policy</strong><small>How information is handled</small></span></Link>
              <Link href="/terms" className="help-menu-item" role="menuitem"><span className="help-menu-item-icon" aria-hidden="true">§</span><span><strong>Terms</strong><small>Using Wayfind responsibly</small></span></Link>
            </div>}
          </div>
        </div>
      </header>

      {/* Main scrollable content */}
      <main id="main-content" className="public-content" tabIndex={-1}>
        {children}
      </main>

    </div>
  );
}
