import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import {
  useGetRegularCandidatesMutation,
  useGetTopCandidatesMutation,
} from "../api/candidateApiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { Card, Grid, Tabs } from "@mantine/core";
import { CandidatePreviewCard } from "@/entities/candidate/ui/candidatePreviewCard";

export function CandidateList({ className }: { className?: string }) {
  const { currentFilters } = useSelector(
    (state: RootState) => state.employerFilters
  );
  const { candidates } = useSelector((state: RootState) => state.candidates);
  const [getRegularCandidates, { isLoading: regularIsLoading }] =
    useGetRegularCandidatesMutation();
  const [getTopCandidates, { isLoading: topIsLoading }] =
    useGetTopCandidatesMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const type = params.get("type");

  useEffect(() => {
    const filter = currentFilters || {};
    switch (type) {
      case "regular":
        getRegularCandidates(filter);
        break;
      case "top":
        getTopCandidates(filter);
        break;
      default:
        getTopCandidates(filter);
    }
  }, [currentFilters, type]);

  const setType = useCallback(
    (_type: string) => {
      if (_type == type) return;
      const params = new URLSearchParams(location.search);
      params.set("type", _type);
      navigate({ pathname: "", search: params.toString() });
    },
    [navigate, location.search]
  );

  return (
    <Card className={className}>
      <Tabs defaultValue={type || "top"}>
        <Tabs.List>
          <Tabs.Tab value="top" onClick={() => setType("top")}>
            Топ кандидаты
          </Tabs.Tab>
          <Tabs.Tab value="regular" onClick={() => setType("regular")}>
            Остальные
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Grid columns={1}>
        {candidates &&
          candidates.map((candidate) => (
            <>
              <CandidatePreviewCard
                candidate={candidate}
                className="w-full h-20"
              />
            </>
          ))}
      </Grid>
    </Card>
  );
}
