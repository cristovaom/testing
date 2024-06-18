import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { handleSignIn } from "@/api/sign-in";

const signInSchema = z.object({
  username: z.string().min(2, "Usuario inválido!"),
  password: z.string().min(2, "Senha inválida!"),
});

type signInschemaBody = z.infer<typeof signInSchema>;

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInschemaBody>({
    resolver: zodResolver(signInSchema),
  });

  async function handleSubmitLogin(data: signInschemaBody) {
    try {
      const requestAPI = await handleSignIn({
        username: data.username,
        password: data.password,
      });

      if (requestAPI) {
        toast.success("Enviamos um link de login para o seu e-mail!");
      } else if (requestAPI === 401) {
        toast.error("Usuario ou senha inválidos!");
      } else {
        toast.error("Falha ao tentar logar!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Falha ao tentar logar!");
    }
  }
  return (
    <>
      <Helmet title="Login" />

      <div className="p-8">
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Acessar paínel
            </h1>
            <p className="text-sm text-muted-foreground">SpeedBox LTDA.</p>
          </div>

          <form action="space-y-4" onSubmit={handleSubmit(handleSubmitLogin)}>
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="email"
                type="text"
                {...register("username")}
                placeholder="Usuario"
              />
            </div>

            {errors.username && (
              <div className="flex">
                <span className=" text-rose-500">
                  {errors.username.message}
                </span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Sua senha</Label>
              <Input
                id="email"
                type="password"
                {...register("password")}
                placeholder="Senha"
              />
            </div>

            {errors.password && (
              <div className="flex">
                <span className=" text-rose-500">
                  {errors.password.message}
                </span>
              </div>
            )}

            <Button type="submit" className="w-full mt-4">
              Acessar paínel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
