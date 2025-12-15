import { CandidateList } from "@/features/candidate/ui/candidateList";
import { useFetchCitiesMutation } from "@/features/filter/api/employerFilterApiSlice";
import { EmployerSearchFilter } from "@/features/filter/ui/employerSearchFilter";
import { SearchInput } from "@/features/filter/ui/SearchInput";
import { Card, Skeleton } from "@mantine/core";
import { useEffect } from "react";

export default function SearchPage() {
  const [fetchCities, { isLoading }] = useFetchCitiesMutation();

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div className="flex gap-4">
      <div className="w-1/5">
        {!isLoading ? (
          <EmployerSearchFilter />
        ) : (
          <Card className="sticky top-4">
            <Skeleton height={20} width="40%" mb="sm" />
            <Skeleton height={36} radius="sm" mb="sm" />
            <Skeleton height={36} radius="sm" mb="sm" />
            <Skeleton height={36} radius="sm" />
          </Card>
        )}
      </div>
      <div className="w-4/5 flex flex-col">
        <SearchInput />
        <CandidateList />
      </div>
    </div>
  );
}
