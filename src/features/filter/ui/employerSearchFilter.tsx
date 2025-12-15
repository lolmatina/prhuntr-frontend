import {
  Accordion,
  Button,
  Card,
  Checkbox,
  Group,
  MultiSelect,
  NumberInput,
  Text,
  Title,
} from "@mantine/core";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/app/store";
import { setEmployerFilters } from "@/entities/filter/api";

export function EmployerSearchFilter({ className }: { className?: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const { cities: cityList } = useSelector(
    (state: RootState) => state.employerFilters
  );
  const dispatch = useDispatch<AppDispatch>();

  const cities = Array.from(new Set(params.getAll("cities[]")));
  const genders = Array.from(new Set(params.getAll("genders[]")));
  const ageFrom = params.get("ageFrom");
  const ageTo = params.get("ageTo");

  const updateFilter = useCallback(
    (key: string, value: number | string[]) => {
      const params = new URLSearchParams(location.search);
      params.delete(key);

      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.set(key, value.toString());
      }

      dispatch(setEmployerFilters(params));

      navigate({ pathname: "", search: params.toString() }, { replace: false });
    },
    [navigate, location.search]
  );

  const resetFilters = useCallback(() => {
    navigate({ pathname: "" }, { replace: false });
  }, [navigate]);

  return (
    <Card className={className} withBorder>
      <Group justify="space-between" align="center" mb={20}>
        <Title order={3}>Фильтры</Title>
        <Button
          onClick={resetFilters}
          size="xs"
          variant="transparent"
          color="dark">
          Сбросить
        </Button>
      </Group>
      <Accordion multiple defaultValue={["cities", "age", "gender"]}>
        <Accordion.Item value="cities">
          <Accordion.Control>
            <Text fw={500}>Город</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <MultiSelect
              placeholder="Выберите город"
              data={cityList.map((city) => city.name)}
              value={cities}
              onChange={(value) => updateFilter("cities[]", value)}
            />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="age">
          <Accordion.Control>
            <Text fw={500}>Возраст</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Group>
              <Group>
                <Text>От</Text>
                <NumberInput
                  value={parseInt(ageFrom || "18")}
                  onChange={(event) => updateFilter("ageFrom", event as number)}
                />
              </Group>
              <Group>
                <Text>До</Text>
                <NumberInput
                  value={parseInt(ageTo || "60")}
                  onChange={(event) => updateFilter("ageTo", event as number)}
                />
              </Group>
            </Group>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="gender">
          <Accordion.Control>
            <Text fw={500}>Пол</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Checkbox
              label="Мужчина"
              checked={genders.includes("male")}
              onChange={(event) =>
                updateFilter(
                  "genders[]",
                  event.target.checked
                    ? [...genders, "male"]
                    : genders.filter((gender) => gender !== "male")
                )
              }
            />
            <Checkbox
              mt={10}
              label="Женщина"
              checked={genders.includes("female")}
              onChange={(event) =>
                updateFilter(
                  "genders[]",
                  event.target.checked
                    ? [...genders, "female"]
                    : genders.filter((gender) => gender !== "female")
                )
              }
            />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Card>
  );
}
