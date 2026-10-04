"use client";

import { useState } from "react";
import styles from "./LandingPage.module.css";

// ── Types ─────────────────────────────────────────────────────────────────────

export type Scenario = "register" | "search" | "found";

interface RegisteredChild {
  id: string;
  name: string;
  age: number;
  lastSeen?: string;
}

interface LandingPageProps {
  onSelectScenario: (scenario: Scenario, seedMessage: string) => void;
}

// Mock registered children — in production this comes from session/auth context
// The list is empty by default; a real user would have children populated from DB.
const MOCK_REGISTERED_CHILDREN: RegisteredChild[] = [
  // Uncomment to test the registered-children drawer:
  // { id: "1", name: "Aisha Khan", age: 9, lastSeen: "2026-10-01" },
  // { id: "2", name: "Bilal Khan", age: 6 },
];

// ── Icons (inline SVG, no external deps) ─────────────────────────────────────

function IconChild() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M12 11v3" />
      <path d="M9.5 13.5l2.5 1.5 2.5-1.5" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
      <path d="M11 8v3m0 0v3m0-3h3m-3 0H8" />
    </svg>
  );
}

function IconHand() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
      <path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

// ── Child avatar initials ─────────────────────────────────────────────────────

function ChildAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return <span className={styles.childAvatar} aria-hidden="true">{initials}</span>;
}

// ── Registered Children Drawer ────────────────────────────────────────────────

interface ChildDrawerProps {
  registeredChildren: RegisteredChild[];
  onSelectChild: (child: RegisteredChild) => void;
  onAddNew: () => void;
  onClose: () => void;
}

function ChildDrawer({ registeredChildren, onSelectChild, onAddNew, onClose }: ChildDrawerProps) {
  return (
    <>
      <div className={styles.drawerBackdrop} onClick={onClose} aria-hidden="true" />
      <div
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className={styles.drawerHandle} aria-hidden="true" />

        <div className={styles.drawerHead}>
          <div>
            <p className={`t-label ${styles.drawerLabel}`}>Your registered children</p>
            <h2 id="drawer-title" className={styles.drawerTitle}>Who are you looking for?</h2>
          </div>
          <button
            type="button"
            className={styles.drawerClose}
            onClick={onClose}
            aria-label="Close"
          >
            <IconClose />
          </button>
        </div>

        <div className={styles.drawerBody}>
          <ul className={styles.childList} role="list">
            {registeredChildren.map((child) => (
              <li key={child.id}>
                <button
                  type="button"
                  className={styles.childRow}
                  onClick={() => onSelectChild(child)}
                  id={`child-${child.id}`}
                >
                  <ChildAvatar name={child.name} />
                  <div className={styles.childInfo}>
                    <span className={styles.childName}>{child.name}</span>
                    <span className={styles.childMeta}>
                      {child.age} years old
                      {child.lastSeen ? ` · last seen ${new Date(child.lastSeen).toLocaleDateString("en-PK", { day: "numeric", month: "short" })}` : ""}
                    </span>
                  </div>
                  <span className={styles.childArrow}>
                    <IconChevronRight />
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.drawerDivider} />

          <button
            type="button"
            className={styles.addNewRow}
            onClick={onAddNew}
            id="btn-add-new-child"
          >
            <span className={styles.addNewIcon}>
              <IconPlus />
            </span>
            <div className={styles.childInfo}>
              <span className={styles.childName}>Someone else&apos;s child</span>
              <span className={styles.childMeta}>Search for a child you haven&apos;t registered</span>
            </div>
            <span className={styles.childArrow}>
              <IconChevronRight />
            </span>
          </button>
        </div>

        <p className={styles.drawerNote}>
          Your search details are kept private and encrypted.
        </p>
      </div>
    </>
  );
}

// ── Main Landing Page ─────────────────────────────────────────────────────────

export function LandingPage({ onSelectScenario }: LandingPageProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const hasRegisteredChildren = MOCK_REGISTERED_CHILDREN.length > 0;

  function handleRegister() {
    onSelectScenario(
      "register",
      "I want to register my child on Wayfind as a safety measure."
    );
  }

  function handleSearchTap() {
    if (hasRegisteredChildren) {
      setDrawerOpen(true);
    } else {
      onSelectScenario(
        "search",
        "I am looking for my lost child and need help searching."
      );
    }
  }

  function handleSelectChild(child: RegisteredChild) {
    setDrawerOpen(false);
    onSelectScenario(
      "search",
      `I am looking for my child named ${child.name}, who is ${child.age} years old. Please help me search.`
    );
  }

  function handleAddNew() {
    setDrawerOpen(false);
    onSelectScenario(
      "search",
      "I am looking for a child I haven't registered on Wayfind. Please help me search."
    );
  }

  function handleFound() {
    onSelectScenario(
      "found",
      "I just found a lost child and need to know what to do."
    );
  }

  return (
    <div className={styles.landing}>
      {/* Hero */}
      <header className={styles.hero}>
        <span className={styles.heroMark} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3 4.5 7.5v9L12 21l7.5-4.5v-9L12 3Z" />
            <path d="m8 12 2.5 2.5L16 9" />
          </svg>
        </span>

        <p className={`t-label ${styles.heroLabel}`}>Wayfind · Child Safety</p>

        <h1 className={styles.heroTitle}>
          How can we<br />help you today?
        </h1>

        <p className={styles.heroSubtitle}>
          Choose the option that best describes your situation.
          We&apos;ll guide you step by step — no lengthy forms.
        </p>
      </header>

      {/* Scenario cards */}
      <main className={styles.cardGrid} aria-label="Choose your situation">
        <button
          type="button"
          className={`${styles.scenarioCard} ${styles.cardRegister}`}
          onClick={handleRegister}
          id="card-register-child"
          aria-describedby="desc-register"
        >
          <span className={`${styles.cardIcon} ${styles.iconAccent}`}>
            <IconChild />
          </span>
          <div className={styles.cardBody}>
            <h2 className={styles.cardTitle}>I want to register my child on Wayfind</h2>
            <p id="desc-register" className={styles.cardDesc}>
              Create a safety record for your child before anything happens. Takes about 5 minutes.
            </p>
          </div>
          <span className={styles.cardChevron}>
            <IconArrow />
          </span>
        </button>

        <button
          type="button"
          className={`${styles.scenarioCard} ${styles.cardSearch}`}
          onClick={handleSearchTap}
          id="card-search-child"
          aria-describedby="desc-search"
        >
          <span className={`${styles.cardIcon} ${styles.iconError}`}>
            <IconSearch />
          </span>
          <div className={styles.cardBody}>
            <h2 className={styles.cardTitle}>I am looking for my lost child</h2>
            <p id="desc-search" className={styles.cardDesc}>
              Search our records, activate an alert, and connect with local shelters immediately.
            </p>
          </div>
          <span className={styles.cardChevron}>
            <IconArrow />
          </span>
        </button>

        <button
          type="button"
          className={`${styles.scenarioCard} ${styles.cardFound}`}
          onClick={handleFound}
          id="card-found-child"
          aria-describedby="desc-found"
        >
          <span className={`${styles.cardIcon} ${styles.iconTeal}`}>
            <IconHand />
          </span>
          <div className={styles.cardBody}>
            <h2 className={styles.cardTitle}>I just found a lost child — what do I do?</h2>
            <p id="desc-found" className={styles.cardDesc}>
              We&apos;ll guide you on keeping the child safe and help report to the right authorities.
            </p>
          </div>
          <span className={styles.cardChevron}>
            <IconArrow />
          </span>
        </button>
      </main>

      {/* Trust note */}
      <footer className={styles.trustNote} aria-label="Privacy notice">
        <span aria-hidden="true">●</span>
        All information is encrypted and only shared with verified shelters and authorities.
      </footer>

      {/* Registered children drawer */}
      {drawerOpen && (
        <ChildDrawer
          registeredChildren={MOCK_REGISTERED_CHILDREN}
          onSelectChild={handleSelectChild}
          onAddNew={handleAddNew}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </div>
  );
}
