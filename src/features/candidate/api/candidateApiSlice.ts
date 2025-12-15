import { apiSlice } from "@/app/api/api";
import { setCandidates } from "@/entities/candidate/api";
import type { CandidateResume } from "@/entities/candidate/model/types";
import type { EmployerFilters } from "@/entities/filter/model/types";
import type { PaginatedResponse } from "../model/types";

export const candidateApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRegularCandidates: builder.mutation<PaginatedResponse, EmployerFilters>({
      query: (credentials) => ({
        url: "/employer/resume-list",
        method: "GET",
        params: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(({ data }) => {
            dispatch(setCandidates(data));
          })
          .catch();
      },
    }),
    getTopCandidates: builder.mutation<PaginatedResponse, EmployerFilters>({
      query: (credentials) => ({
        url: "/employer/resume-list/top",
        method: "GET",
        params: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(({ data }) => {
            dispatch(setCandidates(data));
          })
          .catch();
      },
    }),
  }),
});

export const { useGetRegularCandidatesMutation, useGetTopCandidatesMutation } =
  candidateApiSlice;
