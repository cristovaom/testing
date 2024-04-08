import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Archive, Search, SquarePen } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { DriversDetails } from "./drivers-details";
import { DriversFilter } from "./drivers-filter";
import { DeleteConfirmModal } from "@/components/delete-confirm-modal";
import { DriversEdit } from "./drivers.-edit";
import { useEffect, useState } from "react";
import { fetchDriversAPI } from "@/api/fetch-drivers";
import { format, formatDistanceToNowStrict } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DriverPropsAPI {
  id: string;
  name: string;
  birthdate: Date;
  age?: number;
  cpf: string;
  email?: string;
  totalTickets?: number;
  cnh?: string;
  created_at: Date;
  phone?: string;
}

export function Drivers() {
  const [data, setData] = useState<DriverPropsAPI[]>([]);

  useEffect(() => {
    async function getDrivers() {
      const data = await fetchDriversAPI({ page: 0 });
      setData(data);
    }
    getDrivers();
  }, []);
  return (
    <>
      <Helmet title="Motoristas" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Lista de motoristas
        </h1>

        <div className="space-y-2.5">
          <DriversFilter />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Nome</TableHead>
                  <TableHead className="w-[140px]">Idade</TableHead>
                  <TableHead className="w-[164px]">
                    Data de nascimento
                  </TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead className="w-[140px]">Total de Multas</TableHead>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[64px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data ? (
                  data.map((driver) => {
                    return (
                      <TableRow>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline">
                                <Search className="h-3 w-3" />
                                <span className="sr-only">
                                  Detalhes do motorista
                                </span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DriversDetails
                                id={driver.id}
                                name={driver.name}
                                cpf={driver.cpf}
                                cnh={driver.cnh}
                                created_at={driver.created_at}
                                birthdate={driver.birthdate}
                                totalTickets={0}
                              />
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                        <TableCell>{driver.id}</TableCell>
                        <TableCell>{driver.name}</TableCell>
                        <TableCell>
                          {formatDistanceToNowStrict(
                            new Date(driver.birthdate),
                            {
                              locale: ptBR,
                              addSuffix: false,
                            }
                          )}
                        </TableCell>
                        <TableCell>
                          {format(new Date(driver.birthdate), "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell>
                          {driver.cpf.replace(
                            /(\d{3})(\d{3})(\d{3})(\d{2})/,
                            "$1.$2.$3-$4"
                          )}
                        </TableCell>
                        <TableCell className=" text-center">0</TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline">
                                <SquarePen className="h-3 w-3" />
                                <span className="sr-only">
                                  Editar motorista
                                </span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DriversEdit
                                id={driver.id}
                                name={driver.name}
                                cpf={driver.cpf}
                                cnh={driver.cnh}
                                created_at={driver.created_at}
                                birthdate={driver.birthdate}
                                totalTickets={0}
                                phone={driver.phone}
                                email={driver.email!}
                              />
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline">
                                <Archive className="h-3 w-3" />
                                <span className="sr-only">
                                  Excluir motorista
                                </span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DeleteConfirmModal
                                title="Excluir motorista"
                                description="Tem certeza que deseja deletar este motorista? Esta ação não pode ser desfeita!"
                              />
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <div>Carregando..</div>
                )}
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
