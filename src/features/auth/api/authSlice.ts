import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  access: string | null;
  refresh: string | null;
  hasCompany: boolean;
  firstLogin: boolean;
  signedOffer: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  loading: false,
  error: null,
  access: null,
  refresh: null,
  firstLogin: false,
  hasCompany: false,
  signedOffer: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<Omit<AuthState, "loading" | "error">>
    ) => {
      const { access, refresh, firstLogin, hasCompany, signedOffer } =
        action.payload;
      state.access = access;
      state.refresh = refresh;
      state.firstLogin = firstLogin;
      state.hasCompany = hasCompany;
      state.signedOffer = signedOffer;
    },
    setAccessToken: (state, action: PayloadAction<{ access: string }>) => {
      state.access = action.payload.access;
    },
    logOut: (state) => {
      state.access = null;
      state.refresh = null;
    },
  },
});

export const { setCredentials, setAccessToken, logOut } = authSlice.actions;
export default authSlice.reducer;
