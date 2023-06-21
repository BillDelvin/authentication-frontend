import { Outlet, Navigate } from "react-router-dom";

export default function PublicRoutes({ isLogin }: { isLogin: boolean }) {
  return isLogin ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
