import { createSlice } from "@reduxjs/toolkit";
import type { User } from "./user";
import type { RootState } from "@/app/store";

interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.user;
