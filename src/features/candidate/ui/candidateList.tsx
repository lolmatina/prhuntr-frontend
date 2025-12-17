import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import {
  useGetRegularCandidatesMutation,
  useGetTopCandidatesMutation,
} from "../api/candidateApiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { CandidatePreviewCard } from "@/entities/candidate/ui/candidatePreviewCard";
import { Card, Tabs } from "antd-mobile";

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
    <div className={`${className} px-4`}>
      <Tabs
        stretch={false}
        style={{
          "--active-line-color": "#000",
          "--active-title-color": "#000",
        }}
        defaultActiveKey={type || "top"}
        onChange={(tab: string) => setType(tab)}>
        <Tabs.Tab key="top" title="Топ кандидаты" />
        <Tabs.Tab key="regular" title="Остальные" />
      </Tabs>
      <div className="flex flex-col gap-1 py-4">
        {candidates.map((candidate) => (
          <CandidatePreviewCard candidate={candidate} key={candidate.id} />
        ))}
      </div>
    </div>
  );
}
