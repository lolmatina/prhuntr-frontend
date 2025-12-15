import {
  Group,
  Button,
  ActionIcon,
  Divider,
  Indicator,
  Image,
} from "@mantine/core";
import {
  IconSearch,
  IconHeart,
  IconBell,
  IconMenu2,
} from "@tabler/icons-react";
import logo from "@/assets/logo.svg";

export function AppHeader() {
  return (
    <header className="bg-black py-4 px-4">
      <Group h="100%" justify="space-between">
        {/* Left side */}
        <Group gap="xs">
          {/* Logo */}
          <Group>
            <Image w={40} h={40} src={logo} />
            <Indicator
              label="99+"
              size={18}
              offset={0}
              position="middle-end"
              mr={20}>
              <Button variant="subtle" c="white" fw={600}>
                Резюме и профиль
              </Button>
            </Indicator>
          </Group>

          <Button variant="subtle" color="gray.4">
            Отклики
          </Button>
          <Button variant="subtle" color="gray.4">
            Помощь
          </Button>
        </Group>

        {/* Right side */}
        <Group gap="md">
          <Button variant="subtle" leftSection={<IconSearch size={26} />}>
            Поиск
          </Button>

          <Indicator label="12" size={16} processing>
            <ActionIcon variant="subtle" color="gray">
              <IconBell size={26} />
            </ActionIcon>
          </Indicator>

          <ActionIcon variant="subtle" color="gray">
            <IconHeart size={26} />
          </ActionIcon>

          <Button radius="md">Создать резюме</Button>

          <Divider orientation="vertical" />

          <ActionIcon variant="subtle" color="gray">
            <IconMenu2 size={22} />
          </ActionIcon>
        </Group>
      </Group>
    </header>
  );
}
