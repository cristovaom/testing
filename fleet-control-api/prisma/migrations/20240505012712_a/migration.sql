/*
  Warnings:

  - You are about to drop the column `driverId` on the `Audit` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Audit" DROP CONSTRAINT "Audit_driverId_fkey";

-- AlterTable
ALTER TABLE "Audit" DROP COLUMN "driverId";
