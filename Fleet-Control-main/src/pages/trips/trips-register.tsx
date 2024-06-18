import { CreateCorrida } from "@/api/create-corrida";
import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const tripSchema = z.object({
  cpfMotorista: z
    .string({
      required_error: "cpfMotorista é obrigatório!",
      invalid_type_error: "cpfMotorista inválido!",
    })
    .min(3, "cpfMotorista inválido!"),
  PlacaVeiculo: z
    .string({
      required_error: "PlacaVeiculo é obrigatório!",
      invalid_type_error: "PlacaVeiculo inválido!",
    })
    .min(1, "PlacaVeiculo inválido!"),
  destino: z.string({
    required_error: "destino é obrigatório!",
    invalid_type_error: "destino inválido!",
  }),
  horarioSaida: z
    .string({
      required_error: "nomeEmpresa é obrigatório!",
      invalid_type_error: "nomeEmpresa inválido!",
    })
    .min(2, "nomeEmpresa inválido!"),
  horarioChegada: z.string(),
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

  async function handleSubmitForm(data: TripSchemaBody) {
    console.log(data);
    const response = await CreateCorrida({
      ...data,
      horarioSaida: new Date(data.horarioSaida),
      horarioChegada: new Date(data.horarioChegada),
    });

    if (response.statusCode === 200 || response.statusCode === 201) {
      return toast.success("Corrida cadastrada com sucesso!");
    }
    if (response.status === 400) {
      return toast.error("Erro ao cadastrar corrida!");
    }
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
              *CPF do motorista
            </Label>
            <Input
              placeholder="Ponto de partida"
              id="ppartida"
              {...register("cpfMotorista")}
            />
            <div>
              {errors.cpfMotorista && (
                <span className="text-rose-500">
                  {errors.cpfMotorista.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Label htmlFor="pfinal" className="w-20">
              *Placa do veículo
            </Label>
            <Input
              placeholder="Ponto final"
              id="pfinal"
              {...register("PlacaVeiculo")}
            />
            <div>
              {errors.PlacaVeiculo && (
                <span className="text-rose-500">
                  {errors.PlacaVeiculo.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Label htmlFor="hfinal" className="w-20">
              Destino
            </Label>
            <Input
              type="text"
              id="hfinal"
              {...register("destino")}
              placeholder="Destino"
            />
            <div>
              {errors.destino && (
                <span className="text-rose-500">Destino inválido!</span>
              )}
            </div>
          </div>

          <div className="flex items-center  gap-6">
            <Label htmlFor="nomeEmpresa" className="w-20">
              *Horario de saída
            </Label>
            <Input
              placeholder="Horario de saída"
              id="nomeEmpresa"
              {...register("horarioSaida")}
              type="datetime-local"
            />
            <div>
              {errors.horarioSaida && (
                <span className="text-rose-500">
                  {errors.horarioSaida.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center  gap-6">
            <Label htmlFor="nomeEmpresa" className="w-20">
              *Horario de chegada
            </Label>
            <Input
              placeholder="Nome da empresa"
              id="nomeEmpresa"
              {...register("horarioChegada")}
              type="datetime-local"
            />
            <div>
              {errors.horarioChegada && (
                <span className="text-rose-500">
                  {errors.horarioChegada.message}
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
