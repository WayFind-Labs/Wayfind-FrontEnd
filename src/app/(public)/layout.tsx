import type { Metadata } from "next";
import { PublicShell } from "@/components/public/PublicShell";
import { ShellProvider } from "@/components/public/PublicShell/ShellContext";

export const metadata: Metadata = {
  title: "Wayfind — Child Safety",
  description: "Register your child, search for a missing child, or report a found child. Wayfind connects families with shelters and authorities.",
};

/**
 * PublicLayout
 *
 * Wraps the public prompt experience in the mobile-first Wayfind shell.
 * ShellProvider allows child pages to signal layout preferences upward
 * without prop-drilling across the Next.js layout boundary.
 */
export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ShellProvider>
      <PublicShell>{children}</PublicShell>
    </ShellProvider>
  );
}
