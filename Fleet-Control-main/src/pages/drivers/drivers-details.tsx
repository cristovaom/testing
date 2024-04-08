import { DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { format, formatDistanceToNowStrict } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DriversDetailsPropsAPI {
  id: string;
  name: string;
  birthdate: Date;
  cpf: string;
  totalTickets?: number;
  cnh?: string;
  created_at: Date;
}

export function DriversDetails({
  id,
  name,
  birthdate,
  cpf,
  totalTickets,
  cnh,
  created_at,
}: DriversDetailsPropsAPI) {
  return (
    <>
      <DialogContent>
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle>Nome: João Prado silva</DialogTitle>
        </DialogHeader>

        <Separator className="mt-6 mb-6" />

        <DialogDescription>
          <Table>
            <TableHeader className="flex justify-between">
              <TableRow className="flex flex-col">
                <TableHead>Identificador:</TableHead>
                <TableHead>Nome:</TableHead>
                <TableHead>Idade:</TableHead>
                <TableHead>Data de Nascimento:</TableHead>
                <TableHead>Número de Multas:</TableHead>
                <TableHead>CPF:</TableHead>
                <TableHead>CNH:</TableHead>
                <TableHead>Data de Cadastro:</TableHead>
              </TableRow>
              <TableRow className="flex flex-col">
                <TableHead>{id}</TableHead>
                <TableHead>{name}</TableHead>
                <TableHead>
                  {formatDistanceToNowStrict(new Date(birthdate), {
                    locale: ptBR,
                    addSuffix: false,
                  })}
                </TableHead>
                <TableHead>
                  {" "}
                  {format(new Date(birthdate), "dd/MM/yyyy")}
                </TableHead>
                <TableHead>{totalTickets}</TableHead>
                <TableHead>{cpf}</TableHead>
                <TableHead>{cnh}</TableHead>
                <TableHead>
                  {format(new Date(created_at), "dd/MM/yyyy")}
                </TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </DialogDescription>
      </DialogContent>
    </>
  );
}
