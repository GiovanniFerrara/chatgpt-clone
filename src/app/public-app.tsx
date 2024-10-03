import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { routesConfig } from "../config";
import NotFoundPage from "../pages/not-found-page/not-found-page.page";

const AuthenticatedApp: FC = () => {
  return (
    <Routes>
      {routesConfig.publicRoutes.map((config) => (
        <Route key={`${config.path}`} {...config} />
      ))}
      <Route path="*" Component={NotFoundPage} />
    </Routes>
  );
};

export default AuthenticatedApp;
