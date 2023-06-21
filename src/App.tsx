import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import MinimalLayout from "./components/MinimalLayout";
import PublicRoutes from "./components/PublicRoutes";
import PrivateRoutes from "./components/PrivateRoutes";

import AuthModule from "./pages/Auth";
import PublicModule from "./pages/Public";
import RegisterModule from "./pages/Public/register";

import { useAppSelector, useAppDispatch } from "./app/hook";
import { setUserData } from "./app/slicers/auth";

function App() {
  const dispatch = useAppDispatch();
  const { isLoggin } = useAppSelector((state) => state.auth);

  // adding useEffect for check if
  // user already login or not
  useEffect(() => {
    dispatch(setUserData());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggin]);

  return (
    <Routes>
      <Route path="/" element={<MinimalLayout />}>
        {/* Public Route */}
        <Route element={<PublicRoutes isLogin={isLoggin} />}>
          <Route path="login" element={<PublicModule />} />
          <Route path="register" element={<RegisterModule />} />
        </Route>

        {/* Private Route */}
        <Route path="/" element={<PrivateRoutes isLogin={isLoggin} />}>
          <Route path="dashboard" element={<AuthModule />} />
        </Route>

        {/* Redirection to another page  */}
        <Route path="*" element={<h2>404 Page Not Found</h2>} />
      </Route>
    </Routes>
  );
}

export default App;
