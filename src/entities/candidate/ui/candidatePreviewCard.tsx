import { Card } from "antd-mobile";
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
      <CandidatePreviewCardHeader candidate={candidate} />
    </Card>
  );
}
