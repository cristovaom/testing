import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import { SignIn } from "./pages/auth/sign-in";
import { Dashboard } from "./pages/dashboard/dashboard";

import { Trips } from "./pages/trips/trips";
import { Tickets } from "./pages/tickets/tickets";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Dashboard /> },

      { path: "/corridas", element: <Trips /> },
      { path: "/multas", element: <Tickets /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
]);
