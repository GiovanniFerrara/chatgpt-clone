import { FC } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { routesConfig } from "../config";
import NotFoundPage from "../pages/not-found-page/not-found-page.page";

const AuthenticatedApp: FC = () => {
  return (
    <Routes>
      <BrowserRouter>
        {routesConfig.publicRoutes.map((config) => (
          <Route key={`${config.path}`} {...config} />
        ))}
        <Route path="*" Component={NotFoundPage} />
      </BrowserRouter>
    </Routes>
  );
};

export default AuthenticatedApp;
