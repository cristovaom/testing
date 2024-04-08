import { Input } from "@/components/ui/input";

import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CarsRegister } from "./cars-register";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function CarsFilter() {
  return (
    <div className="flex justify-between">
      <form className="flex items-center gap-2">
        <span className="text-sm font-semibold">Filtros:</span>
        <Input placeholder="ID do veículo" className="h-8 w-auto" />
        <Input placeholder="Placa do veículo" className="h-8 w-[320px]" />

        <Button variant="secondary" size="xs" type="submit">
          <Search className="mr-2 h-4 w-4" />
          Filtrar resultados
        </Button>
        <Button variant="outline" size="xs" type="button">
          <X className="mr-2 h-4 w-4" />
          Remover filtros
        </Button>
      </form>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" size="xs" type="button">
            Cadastrar veículo
          </Button>
        </DialogTrigger>

        <DialogContent>
          <CarsRegister />
        </DialogContent>
      </Dialog>
    </div>
  );
}
