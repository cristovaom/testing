import { Helmet } from "react-helmet-async";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ArrowRight, Search, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TicketsDetails } from "./tickets-details";
import { DeleteConfirmModal } from "@/components/delete-confirm-modal";

export function Tickets() {
  return (
    <>
      <Helmet title="Multas" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Lista de Multas</h1>

        <div className="space-y-2.5">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Nome do Motorista</TableHead>
                  <TableHead className="w-[180px]">
                    Identificar da corrida
                  </TableHead>
                  <TableHead className="w-[164px]">Categoria</TableHead>
                  <TableHead className="w-[140px]">Valor</TableHead>
                  <TableHead className="w-[140px]">Pontos</TableHead>
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
                <TableRow>
                  {/* Tabela 1 */}
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Search className="h-3 w-3" />
                          <span className="sr-only">Detalhes da multa</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <TicketsDetails />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>asdfadsf241341412341234</TableCell>
                  <TableCell>João Silva Prado</TableCell>
                  <TableCell>asdfadsf24134141234234412341234</TableCell>
                  <TableCell>Velocidade</TableCell>
                  <TableCell>R$ 150.18</TableCell>
                  <TableCell>5</TableCell>

                  <TableCell>
                    <Button variant="ghost" size="xs">
                      <ArrowRight className="mr-2 h-3 w-3" />
                      Pagar
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Button variant="success">PAGA</Button>
                  </TableCell>

                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Trash className="h-3 w-3" />
                          <span className="sr-only">Detalhes da corrida</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DeleteConfirmModal
                          title="Deseja excluir essa multa?"
                          description="Você tem certeza que deseja excluir essa multa? Essa ação é irreversível depois."
                        />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
                {/* tabela 2 */}
                <TableRow>
                  {/* Tabela 1 */}
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Search className="h-3 w-3" />
                          <span className="sr-only">Excluir lixeira</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <TicketsDetails />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>asdfadsf241341412341234</TableCell>
                  <TableCell>João Silva Prado</TableCell>
                  <TableCell>asdfadsf24134141234234412341234</TableCell>
                  <TableCell>Velocidade</TableCell>
                  <TableCell>R$ 150.18</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="xs">
                      <ArrowRight className="mr-2 h-3 w-3" />
                      Pagar
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="destructive">Pagamento</Button>
                  </TableCell>

                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Trash className="h-3 w-3" />
                          <span className="sr-only">Excluir lixeira</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DeleteConfirmModal
                          title="Deseja excluir essa multa?"
                          description="Você tem certeza que deseja excluir essa multa? Essa ação é irreversível depois."
                        />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  {/* Tabela 2 */}
                </TableRow>
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
