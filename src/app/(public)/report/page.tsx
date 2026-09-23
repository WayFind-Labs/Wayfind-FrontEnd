import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Wayfind assistant",
  description: "Use the Wayfind assistant.",
};

export default function ReportPage() {
  redirect("/");
}
