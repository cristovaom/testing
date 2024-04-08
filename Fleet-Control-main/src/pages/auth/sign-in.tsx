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
  email: z.string().email("Formato de e-mail inválido!"),
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
        destination: data.email,
      });

      if (requestAPI) {
        toast.success("Enviamos um link de login para o seu e-mail!");
      }
    } catch (error) {
      toast.error("E-mail não encontrado!");
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
              <Label htmlFor="email">seu e-mail</Label>
              <Input
                id="email"
                type="text"
                {...register("email")}
                placeholder="Email"
              />
            </div>

            {errors.email && (
              <div className="flex">
                <span className=" text-rose-500">{errors.email.message}</span>
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
