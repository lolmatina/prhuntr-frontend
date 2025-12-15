import { apiSlice, type RequestResponse } from "@/app/api/api";
import { setUser } from "@/entities/user/model/userSlice";
import { setCredentials } from "./authSlice";
import type {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
} from "../model";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<RequestResponse<LoginResponse>, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data: result } = await queryFulfilled;
          if (!result.data) return;

          const { data } = result;
          dispatch(setUser(data.user));
          dispatch(
            setCredentials({
              access: data.access,
              refresh: data.refresh,
              signedOffer: data.signed_offer,
              firstLogin: !!data.first_login_at,
              hasCompany: !!data.has_company,
            })
          );
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
    register: builder.mutation<Response, RegisterCredentials>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
