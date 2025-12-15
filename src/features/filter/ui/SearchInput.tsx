import { ActionIcon, Card, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconSearch } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { setEmployerFilters } from "@/entities/filter/api";

export function SearchInput({ className }: { className?: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const params = new URLSearchParams(location.search);

  const q = params.get("q");

  const [query, setQuery] = useState(q || "");

  const updateFilter = useCallback(
    (value: string) => {
      const params = new URLSearchParams(location.search);
      params.delete("q");
      params.set("q", value);

      dispatch(setEmployerFilters(params));

      navigate({
        pathname: "",
        search: params.toString(),
      });
    },
    [navigate, location.search]
  );

  return (
    <Card withBorder className={className}>
      <TextInput
        size="lg"
        value={query}
        placeholder="Поиск по должности"
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            updateFilter(query);
          }
        }}
        rightSection={
          <ActionIcon size="lg" onClick={() => updateFilter(query)}>
            <IconSearch size={24} />
          </ActionIcon>
        }
      />
    </Card>
  );
}
