import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import NotFoundPage from "./Pages/NotFoundPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import JobsPage from "./Pages/JobsPage";
import ProtectedRoute from "./Components/guards/ProtectedRoute";
import PublicRoute from "./Components/guards/PublicRoute";
import AppLayout from "./layouts/AppLayout";
import JobDetailPage from "./Pages/Jobs/JobDetailPage";
import { useAuthCheck } from "./Hooks/useAuthCheck";
// useAuthCheck();
export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/login", element: <LoginPage /> },
    ],
  },

  {
    element: <ProtectedRoute />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/home", element: <HomePage /> },
          { path: "/jobs", element: <JobsPage /> },
          { path: "/jobs/:id", element: <JobDetailPage /> }
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
