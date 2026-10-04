"use client";

import { useState, useCallback } from "react";
import { LandingPage, Scenario } from "@/components/public/LandingPage";
import { ChatInterface } from "@/components/public/ChatInterface";
import { useShell } from "@/components/public/PublicShell/ShellContext";

interface ActiveSession {
  scenario: Scenario;
  seedMessage: string;
}

export default function PublicPage() {
  const [session, setSession] = useState<ActiveSession | null>(null);
  const { setContentClass } = useShell();

  const handleSelectScenario = useCallback(
    (scenario: Scenario, seedMessage: string) => {
      setContentClass("agent-shell");
      setSession({ scenario, seedMessage });
    },
    [setContentClass]
  );

  const handleBack = useCallback(() => {
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
