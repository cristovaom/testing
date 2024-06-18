import { Helmet } from "react-helmet-async";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ArrowRight, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TicketsRegsiter } from "./tickets-register";
import { useEffect, useState } from "react";
import { FetchMultas } from "@/api/fetch-multas";
import { format } from "date-fns";
import { deleteMulta } from "@/api/delete-multa";
import { toast } from "sonner";

interface ticketsProps {
  id: string;
  isActive: boolean;
  idCorrida: string;
  tipoMulta: string;
  valorMulta: string;
  dataPagamento: string;
  isPago: string;
}

export function Tickets() {
  const [tickets, setTickets] = useState<ticketsProps[]>([]);
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    async function getMultas() {
      const multas = await FetchMultas();
      setTickets(multas);
    }
    getMultas();
  }, [refetch]);

  async function handleDelete(id: string) {
    const response = await deleteMulta({ id });
    if (response) {
      return toast.success("Multa deletada com sucesso!");
    }
  }
  return (
    <>
      <Helmet title="Multas" />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Lista de Multas</h1>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Cadastrar Multas</Button>
              </DialogTrigger>
              <DialogContent>
                <TicketsRegsiter />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="space-y-2.5">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identificador</TableHead>

                  <TableHead className="w-[180px]">
                    Identificar da corrida
                  </TableHead>
                  <TableHead className="w-[180px]">Tipo da Multa</TableHead>
                  <TableHead className="w-[164px]">Data do pagamento</TableHead>
                  <TableHead className="w-[140px]">Valor</TableHead>
                  <TableHead className="w-[140px]"></TableHead>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[64px]">Status</TableHead>

                  <TableHead className="w-[64px]"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {/* {result &&
                  result.orders.map((order) => {
                    return <OrderTableRow key={order.orderId} order={order} />;
                  })} */}
                {tickets.map((ticket) => {
                  return (
                    <TableRow key={ticket.id}>
                      {/* Tabela 1 */}
                      <TableCell></TableCell>
                      <TableCell>{ticket.id}</TableCell>
                      <TableCell>{ticket.idCorrida}</TableCell>
                      <TableCell>{ticket.tipoMulta}</TableCell>
                      <TableCell>
                        {ticket.dataPagamento && (
                          <span>
                            {format(
                              new Date(ticket.dataPagamento),
                              "dd/MM/yyyy: HH:mm:ss"
                            )}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{ticket.valorMulta}</TableCell>

                      <TableCell>
                        <Button variant="ghost" size="xs">
                          <ArrowRight className="mr-2 h-3 w-3" />
                          Pagar
                        </Button>
                      </TableCell>

                      <TableCell>
                        {ticket.isPago === "true" ? (
                          <Button variant="success">PAGA</Button>
                        ) : (
                          <Button variant="destructive">NÃO PAGA</Button>
                        )}
                      </TableCell>

                      <TableCell>
                        <Button
                          variant="outline"
                          onClick={() => {
                            handleDelete(ticket.id!);
                            setRefetch(!refetch);
                          }}
                        >
                          <Trash className="h-3 w-3" />
                          <span className="sr-only">Detalhes da corrida</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          {/* {result && (
            <Pagination
              onPageChange={handlePaginate}
              pageIndex={result.meta.pageIndex}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
            />
          )} */}
        </div>
      </div>
    </>
  );
}
