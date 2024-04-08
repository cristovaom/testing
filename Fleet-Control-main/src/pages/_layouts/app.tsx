import { Header } from "@/components/header/header";
import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function AppLayout() {
  const [videoUrl, setVideoUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await api.get("/user/videos", {
          params: {
            filename: "14bf87b5794119949fe8f639e82ac70a.mp4",
          },
          responseType: "blob", // Alterado para "blob"
        });

        console.log("Content-Type:", response.headers["content-type"]); // Adicione este log

        // Cria um objeto Blob a partir da resposta
        const videoBlob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const url = URL.createObjectURL(videoBlob);
        console.log(url);
        setVideoUrl(url); // Armazena o URL do vídeo no estado
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, []);

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;
          const code = error.response?.data?.code;

          if (status === 401 && code === "UNAUTHORIZED") {
            navigate("/sign-in", { replace: true });
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

        {videoUrl && (
          <div className="flex gap-4 w-[400px]">
            <div className="flex items-center justify-center text ml-40">
              <video controls className="flex">
                <source src={videoUrl} type="video/mp4" />
              </video>

              <video controls>
                <source src={videoUrl} type="video/mp4" />
              </video>
            </div>
          </div>
        )}

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
