import type { CandidateEntry } from "./types";
import {
  candidateProfileSummariesMock,
  mapCandidateProfileSummaryToEntry,
} from "./candidate-profile-summary";

export const candidates: CandidateEntry[] = candidateProfileSummariesMock.map(
  mapCandidateProfileSummaryToEntry,
);
