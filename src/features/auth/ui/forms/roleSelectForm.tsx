import { useState } from "react";
import {
  useNavigate,
  useLocation,
  createSearchParams,
  Link,
} from "react-router-dom";
import {
  Card,
  Text,
  Group,
  Stack,
  Center,
  Button,
  Avatar,
} from "@mantine/core";
import { IconUser, IconBuilding } from "@tabler/icons-react";
import { Heading } from "@/shared/ui/heading";
import { Roles } from "@/shared/enums/role";

type Role = "employer" | "applicant";

export function RoleSelectForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [role, setRole] = useState<Role | "">("");

  const handleNext = () => {
    if (!role) return;
    params.set("role", role);
    navigate({ pathname: "", search: params.toString() });
  };

  const roles: {
    value: Role;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
  }[] = [
    {
      value: "applicant",
      title: "Я ищу работу",
      subtitle: "Профиль соискателя",
      icon: <IconUser size={24} />,
    },
    {
      value: "employer",
      title: "Я ищу сотрудников",
      subtitle: "Профиль работодателя",
      icon: <IconBuilding size={24} />,
    },
  ];

  return (
    <Card shadow="md" withBorder w={400} p={30}>
      <Stack gap="md" align="center">
        <Center>
          <Heading title="Авторизация" />
        </Center>
        <Stack gap="sm" className="w-full">
          {roles.map((r) => (
            <Card
              key={r.value}
              shadow="sm"
              padding="md"
              radius="md"
              withBorder
              onClick={() => setRole(r.value)}
              style={{
                cursor: "pointer",
                borderColor: role === r.value ? "#228be6" : undefined,
                backgroundColor: role === r.value ? "#e7f5ff" : "#fff",
                transition: "all 0.2s",
              }}>
              <Group>
                <Avatar color="gray" size={40} radius="xl">
                  {r.icon}
                </Avatar>
                <Stack gap={2}>
                  <Text fw={500}>{r.title}</Text>
                  <Text size="sm" color="dimmed">
                    {r.subtitle}
                  </Text>
                </Stack>
              </Group>
            </Card>
          ))}
        </Stack>
        <Button fullWidth onClick={handleNext} disabled={!role}>
          Войти
        </Button>
        <Link
          to={{
            pathname: "/auth/register",
            search: createSearchParams(
              role && role in Roles ? { role } : {}
            ).toString(),
          }}
          className="w-full">
          <Button fullWidth variant="light" mb={15} disabled={!role}>
            Зарегистрироваться
          </Button>
        </Link>
      </Stack>
    </Card>
  );
}
