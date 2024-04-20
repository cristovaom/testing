import { EditDriver } from "@/api/edit-drivers";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { z } from "zod";

interface DriversDetailsPropsAPI {
  id: string;
  name: string;
  birthdate: Date;
  cpf: string;
  totalTickets?: number;
  cnh?: string;
  phone?: string;
  created_at: Date;
  email?: string;
  fn_atualizarInfo: () => void;
}

const DriverSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Nome inválido!"),
  email: z.string().email("Email inválido!"),
  phone: z.string(),
  cpf: z.string().min(3, "CPF inválido!"),
  cnh: z.string().min(3, "CNH inválida!"),
  birthdate: z.any(),
});

type DriverSchemaBody = z.infer<typeof DriverSchema>;

export function DriversEdit({
  id,
  name,
  birthdate,
  cpf,
  phone,
  cnh,
  email,
  fn_atualizarInfo,
}: DriversDetailsPropsAPI) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<DriverSchemaBody>({
    resolver: zodResolver(DriverSchema),
  });

  useEffect(() => {
    setValue("id", id);
    setValue("name", name);
    setValue("email", email!);
    setValue("phone", phone!);
    setValue("cpf", cpf);
    setValue("cnh", cnh!);
    setValue("birthdate", birthdate);
  }, []);

  async function handleRegisterDriver(data: DriverSchemaBody) {
    try {
      const sucess = await EditDriver(data);
      if (sucess) {
        fn_atualizarInfo();
        return toast.success("Motorista editado com sucesso!");
      }
    } catch (error) {
      return toast.error("Não foi possivel editar o motorista!");
    }
  }
  return (
    <>
      <DialogHeader>
        <DialogTitle>Editar Motorista</DialogTitle>
        <DialogDescription>Editar os dados do motorista</DialogDescription>
      </DialogHeader>
      <Separator />

      <DialogDescription
        className="flex flex-col gap-8 max-w-[420px] w-full items-center"
        asChild
      >
        <form onSubmit={handleSubmit(handleRegisterDriver)}>
          <div className=" flex items-center gap-4 ">
            <Label htmlFor="nome" className="w-20">
              Id*
            </Label>{" "}
            {/* Definindo largura fixa para as labels */}
            <Input
              disabled
              className="h-8 w-[320px]"
              id="id"
              {...register("id")}
            />
          </div>
          <div className=" flex items-center gap-4 ">
            <Label htmlFor="nome" className="w-20">
              Nome*
            </Label>{" "}
            {/* Definindo largura fixa para as labels */}
            <Input
              placeholder="João Silva Prado"
              className="h-8 w-[320px]"
              id="nome"
              {...register("name")}
            />
            {errors.name && (
              <div className="flex flex-initial justify-start">
                {" "}
                <span className="text-rose-500 text-sm flex flex-initial w-1">
                  {errors.name.message}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="email" className="w-20">
              Email*
            </Label>
            <Input
              placeholder="joaosilvaprado@gmail.com"
              className="h-8 w-[320px]"
              type="email"
              id="email"
              {...register("email")}
            />
            {errors.email && (
              <div className="flex flex-initial justify-start">
                {" "}
                <span className="text-rose-500 text-sm flex flex-initial w-1">
                  {errors.email.message}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="cpf" className="w-20">
              CPF*
            </Label>
            <Input
              placeholder="105.000.419-88"
              className="h-8 w-[320px]"
              id="cpf"
              {...register("cpf")}
            />
            {errors.cpf && (
              <div className="flex flex-initial justify-start">
                {" "}
                <span className="text-rose-500 text-sm flex flex-initial w-1">
                  {errors.cpf.message}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor="cnh" className="w-20">
              CNH*
            </Label>
            <Input
              placeholder="105.000.491234"
              className="h-8 w-[320px]"
              id="cnh"
              {...register("cnh")}
            />
            {errors.cnh && (
              <div className="flex flex-initial justify-start">
                {" "}
                <span className="text-rose-500 text-sm flex flex-initial w-1">
                  {errors.cnh.message}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="phone" className="w-20">
              Telefone*
            </Label>
            <Input
              placeholder="4599912341"
              className="h-8 w-[320px]"
              id="phone"
              {...register("phone")}
            />
          </div>

          <div className="flex items-center gap-6">
            <Label className="w-20">Nascimento*</Label>
            <Input
              className="h-8 w-[320px]"
              type="date"
              {...register("birthdate")}
              placeholder="29/01/1962"
            />
          </div>

          <Button variant="default" type="submit">
            Editar
          </Button>
        </form>
      </DialogDescription>
      <Separator />
      <DialogFooter className="flex flex-start gap-4 mr-20">
        <Separator orientation="vertical" />
        <DialogDescription>
          Lembre-se de conferir as informações do motorista!
        </DialogDescription>
      </DialogFooter>
    </>
  );
}
