import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ticketsSchema = z.object({
  categoria: z.string({
    required_error: "Categoria é obrigatório!",
    invalid_type_error: "Categoria inválido!",
  }),
  valor: z
    .string({
      required_error: "valor é obrigatório!",
      invalid_type_error: "valor inválido!",
    })
    .min(1, "valor inválido!"),
  pontos: z
    .number({
      required_error: "pontos é obrigatório!",
      invalid_type_error: "pontos inválido!",
    })
    .min(1, "pontos inválido!"),
  anexo_multa: z.any(),
  corrida_id: z.string(),
  motorista_id: z.string(),
});

type TicketsSchemaBody = z.infer<typeof ticketsSchema>;

export function TicketsRegsiter() {
  const { register, handleSubmit } = useForm<TicketsSchemaBody>({
    resolver: zodResolver(ticketsSchema),
  });

  function handleSubmitForm(data: TicketsSchemaBody) {
    console.log(data);
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
              *Categoria
            </Label>
            <Select>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent {...register("categoria")} className="w-40">
                <SelectGroup className="w-40">
                  <SelectItem value="velocidade">Velocidade</SelectItem>
                  <SelectItem value="celular">Celular</SelectItem>
                  <SelectItem value="furou preferencial">
                    Furou preferencial
                  </SelectItem>
                  <SelectItem value="furou farol vermelho">
                    Furou farol vermelho
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-6">
            <Label htmlFor="categoria" className="w-21">
              *Anexo da Multa
            </Label>
            <Input type="file" />
          </div>

          <div className="flex items-center gap-6">
            <Label htmlFor="categoria" className="w-28">
              *Corrida ID
            </Label>
            <Input />
          </div>

          <div className="flex items-center gap-6">
            <Label htmlFor="categoria" className="w-20">
              *Motorista
            </Label>
            <Select>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="motorista" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="banana">Maycon</SelectItem>
                  <SelectItem value="blueberry">Joao</SelectItem>
                  <SelectItem value="grapes">Jose</SelectItem>
                  <SelectItem value="pineapple">Pedro</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-6">
            <Label htmlFor="categoria" className="w-20">
              *Carro
            </Label>
            <Select>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Carro" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="banana">Dodge RAM</SelectItem>
                  <SelectItem value="blueberry">Fiesta</SelectItem>
                  <SelectItem value="grapes">Kangoo</SelectItem>
                  <SelectItem value="pineapple">Strada</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
