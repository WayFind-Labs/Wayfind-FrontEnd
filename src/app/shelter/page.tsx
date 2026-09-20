import { redirect } from "next/navigation";

/**
 * Shelter Index Route
 *
 * Directs staff into the primary operational dashboard route.
 */
export default function ShelterIndexPage() {
  redirect("/shelter/dashboard");
}
