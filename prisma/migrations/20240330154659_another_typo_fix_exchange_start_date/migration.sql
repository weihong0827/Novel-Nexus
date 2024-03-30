/*
  Warnings:

  - You are about to drop the column `exchangeStarteDate` on the `Exchange` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exchange" DROP COLUMN "exchangeStarteDate",
ADD COLUMN     "exchangeStartDate" TIMESTAMP(3);
