/**
 * Type declarations for Shelter Operational domain models.
 */
export type CaseStatus = "open" | "investigating" | "matched" | "closed" | "archived";

export interface ShelterRecordSummary {
  id: string;
  name: string;
  location: string;
  capacity: number;
  currentOccupancy: number;
}

export interface CaseRecordSummary {
  id: string;
  caseNumber: string;
  subjectName?: string;
  status: CaseStatus;
  updatedAt: string;
}
