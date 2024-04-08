import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CarsDeleteProps {
  title: string;
  description: string;
}

export function DeleteConfirmModal({ title, description }: CarsDeleteProps) {
  return (
    <>
      <Dialog>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>

          <Button variant="default" type="button">
            Excluir
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
