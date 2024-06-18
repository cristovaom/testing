import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

import { TrashIcon } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { TripsRegister } from "./trips-register";
import { useEffect, useState } from "react";
import { GetCorridas } from "@/api/fetc-Corridas";
import { format } from "date-fns";
import { deleteCorrida } from "@/api/delete-corrida";
import { toast } from "sonner";

export interface Corrida {
  id?: string;
  cpfMotorista: string;
  PlacaVeiculo: string;
  destino: string;
  horarioSaida: string;
  horarioChegada: string;
}

export function Trips() {
  const [corridaData, setCorridaData] = useState<Corrida[]>([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await GetCorridas();
      setCorridaData(response);
    }
    fetchData();
  }, [refetch]);

  async function handleDelete(id: string) {
    const response = await deleteCorrida({ id });
    if (response) {
      return toast.success("Corrida deletada com sucesso!");
    }
  }
  return (
    <>
      <Helmet title="Corridas" />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Lista de corridas
          </h1>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">Adicionar corrida</Button>
            </DialogTrigger>
            <DialogContent>
              <TripsRegister />
            </DialogContent>
          </Dialog>
        </div>
        <div className="space-y-2.5">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[180px]">Id</TableHead>
                  <TableHead className="w-[140px]">CPF Do Motorista</TableHead>
                  <TableHead className="w-[180px]">Placa do veículo</TableHead>
                  <TableHead className="w-[164px]">Destino</TableHead>

                  <TableHead className="w-[164px]">Horario de saída</TableHead>
                  <TableHead className="w-[164px]">
                    Horario de chegada
                  </TableHead>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[64px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {corridaData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell></TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.cpfMotorista}</TableCell>
                    <TableCell>{item.PlacaVeiculo}</TableCell>
                    <TableCell>{item.destino}</TableCell>

                    <TableCell>
                      {format(item.horarioSaida, "dd/MM/yyyy HH:mm:ss")}
                    </TableCell>

                    <TableCell>
                      {format(item.horarioChegada, "dd/MM/yyyy HH:mm:ss")}
                    </TableCell>

                    <TableCell>
                      {/* <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            <SquarePen className="h-3 w-3" />
                            <span className="sr-only">Editar motorista</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <p>editar</p>
                        </DialogContent>
                      </Dialog> */}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        onClick={() => {
                          handleDelete(item.id!);
                          setRefetch(!refetch);
                        }}
                      >
                        <TrashIcon className="h-3 w-3" />
                        <span className="sr-only">Excluir motorista</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
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
