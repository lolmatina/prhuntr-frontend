import type { Gender } from "@/entities/filter/model/types";

export type CandidateResume = {
  id: number;
  position: string;
  portfolio: Portfolio | null;
  profile?: Profile;
  short_description: string;
  salary: number;
  salary_currency: string;
  top_skills: Skill[];
  audio: string | null;
  video: string | null;
  image: string | null;
  responds: {
    id: number;
    name: string;
  }[];
  packages: PackageItem[];
  updated_at: string;
  last_seen: string;
};

export type Portfolio = {
  can_sell: number;
  sell_currency_id: number;
  largest_contract: number;
  contract_currency_id: number;
  annually_deal: number;
  avg_receipts: number;
  receipts_currency_id: number;
};

export type Profile = {
  name: string;
  email: string;
  phone: string;
  city: string;
  birthday: string;
  gender: Gender;
};

export type ResumeSkills = {
  resume_id: number;
  skill_id: number;
  skill: Skill;
  points: number;
  top: boolean;
};

export type Skill = {
  id: number;
  name: string;
  slug: string;
  is_base: boolean;
  popularity: number;
  order: number | null;
  hidden: boolean;
  type: string | null;
};

type PackageItem = {
  type: string;
  value: number;
  expires_at: string;
};
