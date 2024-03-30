/*
  Warnings:

  - You are about to drop the column `exchangeStateDate` on the `Exchange` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exchange" DROP COLUMN "exchangeStateDate",
ADD COLUMN     "exchangeStarteDate" TIMESTAMP(3);
