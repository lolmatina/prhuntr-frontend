import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Group,
  Tooltip,
  Text,
} from "@mantine/core";
import type { Profile } from "../model/types";
import {
  IconCalendar,
  IconMapPin,
  IconPhone,
  IconStar,
} from "@tabler/icons-react";
import { calculateAge } from "@/shared/lib/scripts";

type CandidatePreviewCardHeaderProps = {
  profile?: Profile;
  image?: string | null;
  salary: number;
  updated_at: string;
  last_seen: string;
  position: string;
};

export function CandidatePreviewCardHeader({
  profile,
  image,
  last_seen,
  position,
  salary,
  updated_at,
}: CandidatePreviewCardHeaderProps) {
  if (!profile) return null;

  const age = profile.birthday ? calculateAge(profile.birthday) : undefined;

  return (
    <Group justify="" wrap="nowrap" className="w-full">
      <Group wrap="nowrap">
        <Avatar src={image} alt={profile.name} size={64} radius={8} />

        <Box>
          <Group gap={8} align="center" wrap="nowrap">
            <Text fw={700} size="lg" lineClamp={1}>
              {position}
            </Text>
            <Badge color="dark" variant="filled" size="sm">
              {salary}
            </Badge>
          </Group>

          <Text fw={700} size="md" color="dark.7" lineClamp={1} mt={2}>
            {profile.name}
          </Text>

          <Group gap="xs" mt={4}>
            {age !== undefined && (
              <Group gap={4} align="center">
                <IconCalendar size={14} />
                <Text size="xs">{age} год</Text>
              </Group>
            )}

            <Group gap={4} align="center">
              <IconMapPin size={14} />
              <Text size="xs">{profile.city}</Text>
            </Group>

            <Group gap={4} align="center">
              <IconPhone size={14} />
              <Text size="xs">{profile.phone}</Text>
            </Group>
          </Group>

          <Group gap={12} mt={6}>
            <Text size="xs" color="gray">
              Обновлено: {updated_at}
            </Text>
            <Text size="xs" color="gray">
              Был(а) онлайн: {last_seen}
            </Text>
          </Group>
        </Box>
      </Group>

      <Tooltip label="Добавить в избранное" withArrow position="left">
        <ActionIcon variant="transparent" size="lg">
          <IconStar size={24} stroke={1.5} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}
