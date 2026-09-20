import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Public Experience",
};

/**
 * PublicLayout
 *
 * Structural layout for the public AI agent / conversational user experience.
 * Minimal placeholder structure awaiting visual design implementation.
 */
export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div data-experience="public" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {children}
    </div>
  );
}
