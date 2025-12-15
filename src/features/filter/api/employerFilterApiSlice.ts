import { apiSlice } from "@/app/api/api";
import { setCities } from "@/entities/filter/api";
import type { City } from "@/entities/filter/model/types";

export const employerFilterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCities: builder.mutation<City[], void>({
      query: (credentials) => ({
        url: "/get/cities",
        method: "GET",
        body: credentials,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled.then(({ data }) => {
            dispatch(setCities(data));
          });
        } catch (error) {
          console.log("Error while fetching cities", error);
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useFetchCitiesMutation } = employerFilterApiSlice;
