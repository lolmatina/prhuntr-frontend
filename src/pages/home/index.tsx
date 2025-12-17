import { CandidateList } from "@/features/candidate/ui/candidateList";
import { useFetchCitiesMutation } from "@/features/filter/api/employerFilterApiSlice";
import { EmployerSearchFilter } from "@/features/filter/ui/employerSearchFilter";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function HomePage() {
  const [fetchCities] = useFetchCitiesMutation();
  const { setNav } = useOutletContext<{ setNav: (val: string) => void }>();

  useEffect(() => {
    try {
      setNav("Главная");
      fetchCities();
    } catch {
      console.log("Ошибка");
    }
  }, []);

  return (
    <main className="w-full">
      <EmployerSearchFilter />
      <CandidateList className="py-4" />
    </main>
  );
}
