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
import { useRegisterMutation } from "../../api";
import { Roles } from "@/shared/enums/role";
import { Heading } from "@/shared/ui/heading";
import { Link, createSearchParams, useNavigate } from "react-router-dom";

export function RegisterForm({ role }: { role: keyof typeof Roles }) {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
      role: role,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Некорректный email")
        .required("Обязательное поле"),
      password: Yup.string()
        .min(5, "Минимум 5 символов")
        .required("Обязательное поле"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Пароли не совпадают")
        .required("Обязательное поле"),
    }),
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        await register(values).unwrap();

        navigate({
          pathname: "",
          search: createSearchParams({
            registrationFinished: values.email,
          }).toString(),
        });
      } catch (error) {
        setSubmitting(false);
        if (error instanceof Error) setStatus(error.message);
        else setStatus("Возникла ошибка при логине");
      }
    },
  });

  return (
    <Card shadow="md" withBorder w={400} p={30}>
      <Stack gap="md" align="center">
        <Center>
          <Heading
            title={
              role === "applicant" ? "Стать соискателем" : "Стать работодателем"
            }
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
            <PasswordInput
              label="Повторите пароль"
              placeholder="Введите пароль"
              {...formik.getFieldProps("confirm_password")}
              error={
                formik.touched.confirm_password &&
                formik.errors.confirm_password
                  ? formik.errors.confirm_password
                  : null
              }
            />

            <Button type="submit" fullWidth disabled={isLoading}>
              Зарегистрироваться
            </Button>
          </Stack>
        </form>

        <Link
          to={{
            pathname: "/auth/login",
            search: createSearchParams(
              role && role in Roles ? { role } : {}
            ).toString(),
          }}
          className="w-full">
          <Button fullWidth variant="light" mb={15}>
            Войти
          </Button>
        </Link>
      </Stack>
    </Card>
  );
}
