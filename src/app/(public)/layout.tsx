import type { Metadata } from "next";
import { PublicShell } from "@/components/public/PublicShell";

export const metadata: Metadata = {
  title: "Shelter AI",
  description: "A single prompt for finding help, reporting a child, or searching for someone missing.",
};

/**
 * PublicLayout
 *
 * Wraps the public prompt experience in the mobile-first Wayfind shell.
 */
export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PublicShell>{children}</PublicShell>;
}
