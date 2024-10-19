import React, { useContext } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { Context } from "../../index";
import { routeConfig } from "./routeConfig";

const AppRouter = () => {
  const { user } = useContext(Context);

  return (
    <Routes>
      {Object.entries(routeConfig).map(([key, route]) => (
        key === 'protectedRoute'
          ? user.isAuth
            ? <Route
              key={route.path}
              element={<div className="page-wrapper">{route.element}</div>}
              path={route.path}
            />
            : <Route
              key={route.path}
              element={<Navigate to="/login" />}
              path={route.path}
            />
          : <Route
            key={route.path}
            element={<div className="page-wrapper">{route.element}</div>}
            path={route.path}
          />
      ))}
    </Routes>
  );
};

export default AppRouter;
