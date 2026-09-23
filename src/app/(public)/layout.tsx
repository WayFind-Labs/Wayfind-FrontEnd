import type { Metadata } from "next";
import { PublicShell } from "@/components/public/PublicShell";

export const metadata: Metadata = {
  title: "Shelter AI",
  description: "Report a found child or search for a missing child.",
};

/**
 * PublicLayout
 *
 * Wraps all public-facing routes in the mobile-first PublicShell
 * (sticky topbar + bottom tab bar). See components/public/PublicShell.
 */
export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PublicShell>{children}</PublicShell>;
}
