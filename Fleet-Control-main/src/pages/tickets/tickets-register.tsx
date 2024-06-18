import { GetCorridas } from "@/api/fetc-Corridas";
import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Corrida } from "../trips/trips";
import { CreateMulta } from "@/api/create-multa";

const ticketsSchema = z.object({
  tipoMulta: z
    .string({
      required_error: "Tipo da multa é obrigatório!",
      invalid_type_error: "Tipo da multa inválido!",
    })
    .optional(),

  valorMulta: z
    .string({
      required_error: "valor é obrigatório!",
      invalid_type_error: "valor inválido!",
    })
    .min(1, "valor inválido!"),
  dataPagamento: z.string().optional(),
  idCorrida: z.any().optional(),
  isPago: z.string({
    required_error: "isPago é obrigatório!",
    invalid_type_error: "isPago inválido!",
  }),
});

type TicketsSchemaBody = z.infer<typeof ticketsSchema>;

export function TicketsRegsiter() {
  const [corridas, setCorridas] = useState<Corrida[]>([]);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<TicketsSchemaBody>({
    resolver: zodResolver(ticketsSchema),
  });

  useEffect(() => {
    async function getCorridas() {
      const corridas = await GetCorridas();
      setCorridas(corridas);
    }
    getCorridas();
  }, []);

  async function handleSubmitForm(data: TicketsSchemaBody) {
    const response = await CreateMulta(data as never);
    console.log(response);
  }
  return (
    <>
      <div>
        <DialogHeader>
          <h2>Cadastrar Multa</h2>
        </DialogHeader>
      </div>
      <Separator />
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <Label htmlFor="categoria" className="w-20">
              *Tipo de Multa
            </Label>
            {/* <Select {...register("tipoMulta")}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="velocidade">Velocidade</SelectItem>
                <SelectItem value="celular">Celular</SelectItem>
                <SelectItem value="furou preferencial">
                  Furou preferencial
                </SelectItem>
                <SelectItem value="furou farol vermelho">
                  Furou farol vermelho
                </SelectItem>
              </SelectContent>
            </Select> */}
            <select
              {...register("tipoMulta")}
              className="w-full bg-gray-100 h-10"
            >
              <option value="velocidade">Velocidade</option>
              <option value="celular">Celular</option>
              <option value="furou preferencial">Furou preferencial</option>
              <option value="furou farol vermelho">Furou farol vermelho</option>
            </select>
            {errors.tipoMulta && (
              <span className="text-red-500">{errors.tipoMulta.message}</span>
            )}
          </div>

          <div className="flex items-center gap-6">
            <Label htmlFor="categoria w-24">*Corrida ID</Label>
            {/* <Select {...register("idCorrida")}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {corridas.map((item) => (
                    <SelectItem value={item.id!}>{item.id}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select> */}
            <select
              {...register("idCorrida")}
              className="w-full bg-gray-100 h-10"
            >
              {corridas.map((item) => (
                <option value={item.id!}>{item.id}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-6">
            <Label htmlFor="categoria" className="w-20">
              *valorMulta
            </Label>
            <Input
              type="text"
              placeholder="valorMulta"
              {...register("valorMulta")}
            />
            {
              <div>
                {errors.valorMulta && (
                  <span className="text-red-500">
                    {errors.valorMulta.message}
                  </span>
                )}
              </div>
            }
          </div>

          <div className="flex items-center gap-6">
            <Label htmlFor="categoria" className="w-20">
              *Data de pagamento
            </Label>
            <Input
              type="date"
              placeholder="Data de pagamento"
              {...register("dataPagamento")}
            />
          </div>

          <div className="flex items-center gap-6">
            <Label htmlFor="categoria" className="w-20">
              *Pago
            </Label>
            {/* <Select {...register("isPago")}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Pago ou não pago" />
              </SelectTrigger>
              <SelectContent className="w-40">
                <SelectItem value="true">Pago</SelectItem>
                <SelectItem value="false">Não pago</SelectItem>
              </SelectContent>
            </Select> */}
            <select {...register("isPago")} className="w-full bg-gray-100 h-10">
              <option value="true">Pago</option>
              <option value="false">Não pago</option>
            </select>

            {
              <div>
                {errors.isPago && (
                  <span className="text-red-500">{errors.isPago.message}</span>
                )}
              </div>
            }
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
