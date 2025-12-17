import type { CandidateResume, Profile } from "../model/types";
import {
  IconCalendar,
  IconMapPin,
  IconPhone,
  IconStar,
} from "@tabler/icons-react";
import { calculateAge } from "@/shared/lib/scripts";

export function CandidatePreviewCardHeader({
  candidate,
}: {
  candidate: CandidateResume;
}) {
  const age = candidate.profile?.birthday
    ? calculateAge(candidate.profile.birthday)
    : undefined;

  return (
    <div>
      {candidate.image ? (
        <img
          className="w-[70px] h-[87px] rounded-2xl"
          alt={candidate.image}
          src={candidate.image}
        />
      ) : (
        <div className="w-[70px] h-[87px] bg-gray-600 rounded-2xl" />
      )}
    </div>
  );
}
