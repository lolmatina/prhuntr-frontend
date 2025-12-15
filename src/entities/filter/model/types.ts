export type City = {
  id: number;
  name: string;
  country_id: number;
};

export type Gender = "male" | "female";

export interface EmployerFilters {
  city_id?: number[];
  gender?: string[];
  from_age?: number;
  to_age?: number;
  position?: string;
}
