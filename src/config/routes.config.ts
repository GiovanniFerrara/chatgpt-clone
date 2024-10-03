import Dashboard from "../pages/dashboard/dashboard.page";
import Home from "../pages/home/home.page";
import Login from "../pages/login/login.page";
import Signup from "../pages/signup/signup.page";


export const routesConfig = {
  publicRoutes: [
    {
      path: "/",
      exact: true,
      component: Home
    },
    {
      path: "/signup",
      exact: true,
      component: Signup,
    },
    {
      path: "/login",
      exact: true,
      component: Login,
    },
  ],
  privateRoutes: [
    {
      path: "/dashboard",
      exact: true,
      Component: Dashboard
    },
  ]
}