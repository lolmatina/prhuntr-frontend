import {
  Stack,
  Button,
  TextInput,
  PasswordInput,
  Text,
  Center,
  Card,
} from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../../api";
import { Roles } from "@/shared/enums/role";
import { Heading } from "@/shared/ui/heading";
import { Link, createSearchParams, useNavigate } from "react-router";
import type { LoginResponse } from "../../model";
import type { RequestResponse } from "@/app/api/api";

export function LoginForm({ role }: { role: keyof typeof Roles }) {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
      role: role,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Некорректный email")
        .required("Обязательное поле"),
      password: Yup.string()
        .min(5, "Минимум 5 символов")
        .required("Обязательное поле"),
    }),
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        await login(values).unwrap();
        navigate("/home");
      } catch (error) {
        setSubmitting(false);
        if (
          !isLoading &&
          error &&
          typeof error === "object" &&
          "data" in error
        ) {
          const data = error.data as RequestResponse<LoginResponse>;
          setStatus(data?.message || "Возникла ошибка при логине");
        } else setStatus("Возникла ошибка при логине");
      }
    },
  });

  return (
    <Card shadow="md" withBorder w={400} p={30}>
      <Stack gap="md" align="center">
        <Center>
          <Heading
            title={role === "applicant" ? "Поиск работы" : "Поиск сотрудников"}
          />
        </Center>
        <form className="w-full" onSubmit={formik.handleSubmit}>
          <Stack gap="md">
            {formik.status && (
              <Text c="red" size="sm">
                {formik.status}
              </Text>
            )}
            <TextInput
              label="Email"
              placeholder="your@email.com"
              leftSection={<IconAt size={16} />}
              {...formik.getFieldProps("email")}
              error={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : null
              }
            />
            <PasswordInput
              label="Пароль"
              placeholder="Введите пароль"
              {...formik.getFieldProps("password")}
              error={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : null
              }
            />
            <Button type="submit" fullWidth disabled={isLoading}>
              Войти
            </Button>
          </Stack>
        </form>

        <Link
          to={{
            pathname: "/auth/register",
            search: createSearchParams(
              role && role in Roles ? { role } : {}
            ).toString(),
          }}
          className="w-full">
          <Button fullWidth variant="light" mb={15}>
            Зарегистрироваться
          </Button>
        </Link>
      </Stack>
    </Card>
  );
}
