/*
  Warnings:

  - You are about to drop the `Audit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Driver` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trip` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vehicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Audit" DROP CONSTRAINT "Audit_userId_fkey";

-- DropForeignKey
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_userId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_driverId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_tripId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_driverId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_vehicleId_fkey";

-- DropTable
DROP TABLE "Audit";

-- DropTable
DROP TABLE "Driver";

-- DropTable
DROP TABLE "Ticket";

-- DropTable
DROP TABLE "Trip";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "Vehicle";

-- CreateTable
CREATE TABLE "Corrida" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "cpfMotorista" TEXT NOT NULL,
    "PlacaVeiculo" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "horarioSaida" TIMESTAMP(3) NOT NULL,
    "horarioChegada" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Corrida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Multa" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "idCorrida" TEXT NOT NULL,
    "tipoMulta" TEXT NOT NULL,
    "valorMulta" DOUBLE PRECISION NOT NULL,
    "dataPagamento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Multa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Multa_idCorrida_key" ON "Multa"("idCorrida");

-- AddForeignKey
ALTER TABLE "Multa" ADD CONSTRAINT "Multa_idCorrida_fkey" FOREIGN KEY ("idCorrida") REFERENCES "Corrida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
