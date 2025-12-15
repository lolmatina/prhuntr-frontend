import { Card, Stack, Text, Button, Center } from "@mantine/core";
import { Link } from "react-router-dom";
import { Heading } from "@/shared/ui/heading";

type VerifyEmailProps = {
  email: string;
};

export function VerifyEmailForm({ email }: VerifyEmailProps) {
  return (
    <Card shadow="md" withBorder w={450} p={30}>
      <Stack gap="lg" align="center">
        <Center>
          <Heading title="Подтверждение почты" />
        </Center>

        <Text ta="center" size="sm" c="dimmed">
          <strong>Поздравляем с успешной регистрацией!</strong>
          <br />
          Мы отправили письмо со ссылкой для активации аккаунта на адрес{" "}
          <Text component="span" fw={500}>
            {email}
          </Text>
          .
          <br />
          Пожалуйста, перейдите по ссылке в письме, чтобы завершить регистрацию.
        </Text>

        <Link to="/auth/login" className="w-full">
          <Button fullWidth>Перейти ко входу</Button>
        </Link>
      </Stack>
    </Card>
  );
}
