import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import { SignIn } from "./pages/auth/sign-in";
import { Dashboard } from "./pages/dashboard/dashboard";
import { Drivers } from "./pages/drivers/drivers";
import { Trips } from "./pages/trips/trips";
import { Tickets } from "./pages/tickets/tickets";
import { Cars } from "./pages/cars/cars";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/motoristas", element: <Drivers /> },
      { path: "/corridas", element: <Trips /> },
      { path: "/multas", element: <Tickets /> },
      { path: "/carros", element: <Cars /> },
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
