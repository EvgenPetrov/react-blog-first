import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router/routes";
import { AuthContext } from "../context/context";

export const AppRouter = () => {
  const { isAuth } = useContext(AuthContext);

  if (isAuth === null) {
    // Пока идет проверка аутентификации, не отображаем ничего
    return null;
  }
  console.log("isAuth:", isAuth);

  return (
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          element={
            isAuth ? (
              <route.component />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
      ))}
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          element={<route.component />}
        />
      ))}
      <Route
        path="/"
        element={isAuth ? <Navigate to="/posts" /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};
