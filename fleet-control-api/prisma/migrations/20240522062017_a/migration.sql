-- AlterTable
ALTER TABLE "Multa" ADD COLUMN     "isPago" TEXT,
ALTER COLUMN "valorMulta" SET DATA TYPE TEXT,
ALTER COLUMN "dataPagamento" DROP NOT NULL;
