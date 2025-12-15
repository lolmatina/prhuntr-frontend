import { Group, Title, Button, ActionIcon } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface HeadingProps {
  title: string;
  backUrl?: string; // optional URL to navigate back
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  backUrl,
}: HeadingProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backUrl) {
      navigate(backUrl);
    } else {
      navigate(-1); // go back in history
    }
  };

  return (
    <Group justify="space-between" align="center" mb="md">
      <ActionIcon variant="transparent" onClick={handleBack}>
        <IconArrowLeft size={24} />
      </ActionIcon>
      <Title order={2}>{title}</Title>
      <div className="" /> {/* Placeholder to balance layout */}
    </Group>
  );
};
