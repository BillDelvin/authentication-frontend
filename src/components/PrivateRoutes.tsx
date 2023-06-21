import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoutes({ isLogin }: { isLogin: boolean }) {
  return !isLogin ? <Navigate to="/login" replace /> : <Outlet />;
}
