import type { CandidateResume } from "@/entities/candidate/model/types";

export interface PaginatedResponse {
  current_page: number;
  per_page: number;
  total: number;
  data: CandidateResume[];
}
