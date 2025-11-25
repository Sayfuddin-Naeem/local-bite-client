import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";
// security
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import PageNotFound from "../pages/error/PageNotFound";
// Private page
import MyFavorites from "../pages/private/MyFavorites/MyFavorites";
import MyProfile from "../pages/private/MyProfile/MyProfile";
import MyReviews from "../pages/private/MyReviews/MyReviews";
// public page
import About from "../pages/Public/About/About";
import Home from "../pages/public/Home/Home";
import ResetPassword from "../pages/public/ResetPassword/ResetPassword";
import Reviews from "../pages/Public/Reviews/Reviews";
import SignIn from "../pages/Public/SignIn/SignIn";
import SignUp from "../pages/Public/SignUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <PageNotFound />,
    // HydrateFallback: Loader,

    children: [
      {
        children: [
          {
            index: true,
            Component: Home,
          },
          { path: "/reviews", Component: Reviews },
          { path: "/about", Component: About },
        ],
      },
      {
        Component: PublicRoute,
        children: [
          {
            children: [
              { path: "/signin", Component: SignIn },
              { path: "/signup", Component: SignUp },
              { path: "/reset-password", Component: ResetPassword },
            ],
          },
        ],
      },

      {
        Component: PrivateRoute,
        children: [
          {
            children: [
              { path: "/my-profile", Component: MyProfile },
              { path: "/my-reviews", Component: MyReviews },
              { path: "/my-favorites", Component: MyFavorites },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
