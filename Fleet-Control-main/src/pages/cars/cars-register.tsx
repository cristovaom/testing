import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const carSchema = z.object({
  marca: z
    .string({
      required_error: "Marca é obrigatória!",
      invalid_type_error: "Marca inválida!",
    })
    .min(3, "Marca inválida!"),
  modelo: z
    .string({
      required_error: "Modelo é obrigatório!",
      invalid_type_error: "Modelo inválido!",
    })
    .min(1, "Modelo inválido!"),
  ano: z
    .string({
      required_error: "Ano é obrigatório!",
      invalid_type_error: "Ano inválido!",
    })
    .min(4, "Ano inválido!")
    .max(4, "Ano inválido!")
    .regex(/^[0-9]+$/, "Ano inválido!"),
  placa: z
    .string({
      required_error: "Placa é obrigatória!",
      invalid_type_error: "Placa inválida!",
    })
    .min(2, "Placa inválida!"),
  renavam: z
    .string({
      required_error: "Renavam é obrigatório!",
      invalid_type_error: "Renavam inválido!",
    })
    .min(5, "Renavam inválido!"),
  chassis: z
    .string({
      required_error: "Chassis é obrigatório!",
      invalid_type_error: "Chassis inválido!",
    })
    .min(5, "Chassis inválido!"),
});

type CarSchemaBody = z.infer<typeof carSchema>;

export function CarsRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CarSchemaBody>({
    resolver: zodResolver(carSchema),
  });

  function handleSubmitForm(data: CarSchemaBody) {
    console.log(data);
  }
  return (
    <>
      <Dialog>
        <DialogHeader>
          <DialogTitle>Cadastrar veículo</DialogTitle>
          <DialogDescription>
            Preencha as informações necessarias para cadastrar um veículo na
            frota!
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <DialogDescription>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <section className="flex justify-center flex-col gap-5">
              <div className="flex items-center gap-4">
                <Label className="w-20">*Marca</Label>
                <Input placeholder="Marca do veículo" {...register("marca")} />
                {errors.marca && (
                  <span className="text-red-500 text-xs">
                    {errors.marca.message}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <Label className="w-20">*Modelo</Label>
                <Input
                  placeholder="Modelo do veículo"
                  {...register("modelo")}
                />
                {errors.modelo && (
                  <span className="text-red-500 text-xs">
                    {errors.modelo.message}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <Label className="w-20">*Ano</Label>
                <Input placeholder="Ano do veículo" {...register("ano")} />
                <div>
                  {errors.ano && (
                    <span className="text-red-500 text-xs">
                      {errors.ano.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Label className="w-20">*Placa</Label>
                <Input placeholder="Placa do veículo" {...register("placa")} />
                {errors.placa && (
                  <span className="text-red-500 text-xs">
                    {errors.placa.message}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <Label className="w-20">*Renavam</Label>
                <Input
                  placeholder="Número do renavam"
                  {...register("renavam")}
                />
                {errors.renavam && (
                  <span className="text-red-500 text-xs">
                    {errors.renavam.message}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <Label className="w-20">*Chassi</Label>
                <Input
                  placeholder="Número do chassi"
                  {...register("chassis")}
                />
                {errors.chassis && (
                  <span className="text-red-500 text-xs">
                    {errors.chassis.message}
                  </span>
                )}
              </div>

              <Separator />
            </section>
            <div className="flex items-center justify-center mt-6">
              <Button variant="default" size="sm">
                Cadastrar veículo
              </Button>
            </div>
          </form>
        </DialogDescription>
      </Dialog>
    </>
  );
}
