import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shelter Operations",
};

/**
 * ShelterLayout
 *
 * Operational layout hierarchy for shelter staff and case workers.
 * Structural placeholder awaiting sidebar, topbar, and panel composition.
 */
export default function ShelterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div data-experience="shelter" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {children}
    </div>
  );
}
