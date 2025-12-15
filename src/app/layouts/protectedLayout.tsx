import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

export default function ProtectedLayout() {
  const { access } = useSelector((state: RootState) => state.auth);

  if (!access) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}
