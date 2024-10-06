import Dashboard from "../pages/dashboard/dashboard.page";
import Home from "../pages/home/home.page";
import Login from "../pages/login/login.page";
import Signup from "../pages/signup/signup.page";


export const routesConfig = {
  publicRoutes: [
    {
      path: "/",
      exact: true,
      Component: Home
    },
    {
      path: "/signup",
      exact: true,
      Component: Signup,
    },
    {
      path: "/login",
      exact: true,
      Component: Login,
    },
  ],
  privateRoutes: [
    {
      path: "/dashboard/*",
      Component: Dashboard
    },
  ]
}