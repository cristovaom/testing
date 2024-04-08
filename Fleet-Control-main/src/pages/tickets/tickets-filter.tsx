import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Search, X } from "lucide-react";
import { TicketsRegsiter } from "./tickets-register";

export function TicketsFilter() {
  return (
    <form className="flex items-center gap-2 justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">Filtros:</span>
        <Input placeholder="ID da multa" className="h-8 w-auto" />
        <Input placeholder="Nome do Motorista" className="h-8 w-[320px]" />
        <Select defaultValue="all">
          <SelectTrigger className="h-8 w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos as categorias</SelectItem>
            <SelectItem value="pending">Velocidade</SelectItem>
            <SelectItem value="canceled">Cancelado</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="h-8 w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Qualquer status</SelectItem>
            <SelectItem value="pending">Pagas</SelectItem>
            <SelectItem value="canceled">Não pagas</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="secondary" size="xs" type="submit">
          <Search className="mr-2 h-4 w-4" />
          Filtrar resultados
        </Button>
        <Button variant="outline" size="xs" type="button">
          <X className="mr-2 h-4 w-4" />
          Remover filtros
        </Button>
      </div>

      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Cadastrar Multa</Button>
          </DialogTrigger>

          <DialogContent>
            <TicketsRegsiter />
          </DialogContent>
        </Dialog>
      </div>
    </form>
  );
}
