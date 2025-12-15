import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logOut, setAccessToken } from "@/features/auth/api/authSlice";
import type { RootState } from "../store";
import type { User } from "@/entities/user/model/user";
import { setUser } from "@/entities/user/model/userSlice";

export type RequestResponse<T> = {
  message: string | null;
  error: string | null;
  data: T | null;
};

const baseQuery = fetchBaseQuery({
  baseUrl: (process.env.BUN_PUBLIC_API_URL ||
    "http://localhost:8000/api") as string,
  credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.access; // <-- ВАЖНО

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    const refreshResult = await baseQuery(
      { url: "/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data && typeof refreshResult.data === "object") {
      const { data: response } = refreshResult.data as {
        data: { access: string; user: User };
      };

      api.dispatch(setAccessToken({ access: response.access }));
      api.dispatch(setUser(response.user));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (_builder) => ({}),
});
