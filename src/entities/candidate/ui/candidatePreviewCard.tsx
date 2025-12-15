import { Card } from "@mantine/core";
import type { CandidateResume } from "../model/types";
import { CandidatePreviewCardHeader } from "./candidatePreviewCardHeader";

export function CandidatePreviewCard({
  candidate,
  className,
}: {
  candidate: CandidateResume;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CandidatePreviewCardHeader
        profile={candidate.profile}
        last_seen={candidate.last_seen}
        position={candidate.position}
        salary={candidate.salary}
        updated_at={candidate.updated_at}
        image={candidate.image}
      />
    </Card>
  );
}
