"use client";

import { useState, useCallback } from "react";
import { LandingPage, Scenario } from "@/components/public/LandingPage";
import { ChatInterface } from "@/components/public/ChatInterface";
import { useShell } from "@/components/public/PublicShell/ShellContext";
import { clearSession } from "@/lib/api/client";

interface ActiveSession {
  scenario: Scenario;
  seedMessage: string;
}

export default function PublicPage() {
  const [session, setSession] = useState<ActiveSession | null>(null);
  const { setContentClass } = useShell();

  const handleSelectScenario = useCallback(
    (scenario: Scenario, seedMessage: string) => {
      clearSession();
      setContentClass("agent-shell");
      setSession({ scenario, seedMessage });
    },
    [setContentClass]
  );

  const handleBack = useCallback(() => {
    clearSession();
    setContentClass("");
    setSession(null);
  }, [setContentClass]);

  if (session) {
    return (
      <ChatInterface
        scenario={session.scenario}
        seedMessage={session.seedMessage}
        onBack={handleBack}
      />
    );
  }

  return <LandingPage onSelectScenario={handleSelectScenario} />;
}
