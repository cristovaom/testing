import { Header } from "@/components/header/header";
import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";

export function AppLayout() {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["auth"]);

  useEffect(() => {
    const token = cookie.auth.access_token;
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [cookie]);

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const statusCode = error.response?.status;
          const code = error.response?.statusText;

          if (statusCode === 401 && code === "Unauthorized") {
            navigate("/sign-in", { replace: false });
          }
        }
      }
    );

    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [navigate]);

  return (
    <>
      <div className="flex min-h-screen min-w-screen flex-col antialiased">
        <Header />

        <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
          <Outlet />
        </div>
        <div>
          <footer className="flex justify-center items-center h-16 b-t ">
            <span>
              © {new Date().getFullYear()} - Todos os direitos reservados -
              @FleetControlSpeed
            </span>
          </footer>
        </div>
      </div>
    </>
  );
}
