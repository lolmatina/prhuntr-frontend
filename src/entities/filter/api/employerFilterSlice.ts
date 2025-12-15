import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { City, EmployerFilters, Gender } from "../model/types";

interface InitialState {
  cities: City[];
  genders: Array<Gender>;
  currentFilters: EmployerFilters | null;
}

const initialState: InitialState = {
  cities: [],
  genders: ["male", "female"],
  currentFilters: null,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCities: (state, action) => {
      state.cities = action.payload;
    },
    setEmployerFilters: (state, action: PayloadAction<URLSearchParams>) => {
      const cities = action.payload.getAll("cities[]");

      state.currentFilters = {};

      const city_id = state.cities
        .filter((city) => cities.includes(city.name))
        .map((city) => city.id);
      if (city_id.length > 0) state.currentFilters.city_id = city_id;

      const gender = action.payload.getAll("gender");
      if (gender.length > 0) state.currentFilters.gender = gender;

      const from_age = action.payload.get("ageFrom");
      if (from_age) state.currentFilters.from_age = parseInt(from_age);

      const to_age = action.payload.get("ageTo");
      if (to_age) state.currentFilters.from_age = parseInt(to_age);
    },
  },
});

export const { setCities, setEmployerFilters } = filterSlice.actions;
export default filterSlice.reducer;
