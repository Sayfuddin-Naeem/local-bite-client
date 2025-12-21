import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";
// errors
import PageNotFound from "../pages/error/PageNotFound";
// security
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
// Private page
import MyFavorites from "../pages/private/MyFavorites/MyFavorites";
import MyProfile from "../pages/private/MyProfile/MyProfile";
import MyReviews from "../pages/private/MyReviews/MyReviews";
// public page
import AddEditReview from "../pages/private/AddReview/AddReview";

import ForgotPassword from "../pages/public/ForgotPassword/ForgotPassword";
import Home from "../pages/public/Home/Home";
import ResetPassword from "../pages/public/ResetPassword/ResetPassword";

import SignIn from "../pages/Public/SignIn/SignIn";
import SignUp from "../pages/Public/SignUp/SignUp";
import ReviewDetail from "../pages/public/ReviewDetails/ReviewDetails";
import LoadingState from "../components/shared/LoadingState/LoadingState";
import About from "../pages/public/About/About";
import Reviews from "../pages/public/Reviews/Reviews";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <PageNotFound />,
    HydrateFallback: LoadingState,

    children: [
      {
        children: [
          {
            index: true,
            Component: Home,
          },
          { path: "/reviews", Component: Reviews },
          { path: "/about", Component: About },
          { path: "/review/:reviewId", Component: ReviewDetail },
        ],
      },
      {
        Component: PublicRoute,
        children: [
          {
            children: [
              { path: "/signin", Component: SignIn },
              { path: "/signup", Component: SignUp },
              { path: "/forgot-password", Component: ForgotPassword },
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
              { path: "/add-review", Component: AddEditReview },
              {
                path: "/edit-review/:id",
                element: <AddEditReview isEditMode={true} />,
              },
              { path: "/my-favorites", Component: MyFavorites },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
