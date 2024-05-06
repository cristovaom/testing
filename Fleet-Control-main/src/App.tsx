import "./index.css";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Toaster } from "sonner";
import { router } from "./routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <HelmetProvider>
      <CookiesProvider>
        <ThemeProvider storageKey="fleet-control-theme">
          <Helmet titleTemplate="%s | Fleet Control" />
          <Toaster richColors closeButton />
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </ThemeProvider>
      </CookiesProvider>
    </HelmetProvider>
  );
}
export default App;
