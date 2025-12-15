import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CandidateResume } from "../model/types";
import type { PaginatedResponse } from "@/features/candidate/model/types";

interface InitialState {
  current_page: number;
  per_page: number;
  total: number;
  candidates: CandidateResume[];
  currentCandidate: CandidateResume | null;
}

const initialState: InitialState = {
  current_page: 1,
  per_page: 15,
  total: 0,
  candidates: [],
  currentCandidate: null,
};

const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {
    setCandidates: (state, action: PayloadAction<PaginatedResponse>) => {
      state.candidates = action.payload.data;
      state.current_page = action.payload.current_page;
      state.per_page = action.payload.per_page;
      state.total = action.payload.total;
    },
  },
});

export const { setCandidates } = candidateSlice.actions;
export default candidateSlice.reducer;
