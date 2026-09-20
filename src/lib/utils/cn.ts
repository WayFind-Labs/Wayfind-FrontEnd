import { clsx, type ClassValue } from "clsx";

/**
 * Utility for conditionally joining classNames together cleanly.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
