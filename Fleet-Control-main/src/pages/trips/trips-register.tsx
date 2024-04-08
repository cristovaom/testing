import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const tripSchema = z.object({
  pontoDePartida: z
    .string({
      required_error: "pontoDePartida é obrigatório!",
      invalid_type_error: "pontoDePartida inválido!",
    })
    .min(3, "pontoDePartida inválido!"),
  pontoFinal: z
    .string({
      required_error: "pontoFinal é obrigatório!",
      invalid_type_error: "pontoFinal inválido!",
    })
    .min(1, "pontoFinal inválido!"),
  horarioFinal: z.any().optional(),
  nomeEmpresa: z
    .string({
      required_error: "nomeEmpresa é obrigatório!",
      invalid_type_error: "nomeEmpresa inválido!",
    })
    .min(2, "nomeEmpresa inválido!"),
});

type TripSchemaBody = z.infer<typeof tripSchema>;

export function TripsRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TripSchemaBody>({
    resolver: zodResolver(tripSchema),
  });

  function handleSubmitForm(data: TripSchemaBody) {
    console.log(data);
  }
  return (
    <>
      <div>
        <DialogHeader>
          <h2>Cadastrar viagem</h2>
        </DialogHeader>
      </div>
      <Separator />
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <Label htmlFor="ppartida" className="w-20">
              *Ponto de partida
            </Label>
            <Input
              placeholder="Ponto de partida"
              id="ppartida"
              {...register("pontoDePartida")}
            />
            <div>
              {errors.pontoDePartida && (
                <span className="text-rose-500">
                  {errors.pontoDePartida.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Label htmlFor="pfinal" className="w-20">
              *Ponto final
            </Label>
            <Input
              placeholder="Ponto final"
              id="pfinal"
              {...register("pontoFinal")}
            />
            <div>
              {errors.pontoFinal && (
                <span className="text-rose-500">
                  {errors.pontoFinal.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Label htmlFor="hfinal" className="w-20">
              Horário final
            </Label>
            <Input type="time" id="hfinal" {...register("horarioFinal")} />
            <div>
              {errors.horarioFinal && (
                <span className="text-rose-500">Horario inválido!</span>
              )}
            </div>
          </div>

          <div className="flex items-center  gap-6">
            <Label htmlFor="nomeEmpresa" className="w-20">
              *Nome da empresa
            </Label>
            <Input
              placeholder="Nome da empresa"
              id="nomeEmpresa"
              {...register("nomeEmpresa")}
            />
            <div>
              {errors.nomeEmpresa && (
                <span className="text-rose-500">
                  {errors.nomeEmpresa.message}
                </span>
              )}
            </div>
          </div>
        </section>
        <Separator className="mt-4" />

        <div className="flex items-center justify-center mt-6">
          <Button>Cadastrar corrida</Button>
        </div>
      </form>
    </>
  );
}
