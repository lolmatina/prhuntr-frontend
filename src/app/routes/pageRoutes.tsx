import { Routes, Route, Navigate, type Location } from "react-router-dom";
import { AppLayout } from "../layouts";
import { HomePage, LoginPage, RegistrationPage } from "@/pages";

export function PageRoutes({
  location,
  backgroundLocation,
}: {
  location: Location;
  backgroundLocation: Location;
}) {
  return (
    <Routes location={backgroundLocation || location}>
      <Route path="menu" element={<Navigate to="/home" />} />
      <Route path="auth">
        <Route index element={<Navigate to="/auth/login" />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegistrationPage />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route path="home" element={<HomePage />} />
        <Route path="*" />
      </Route>
    </Routes>
  );
}
