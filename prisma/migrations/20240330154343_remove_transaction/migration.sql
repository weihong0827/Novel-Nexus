/*
  Warnings:

  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_exchangeId_fkey";

-- AlterTable
ALTER TABLE "Exchange" ADD COLUMN     "exchangeEndDate" TIMESTAMP(3),
ADD COLUMN     "exchangeStateDate" TIMESTAMP(3);

-- DropTable
DROP TABLE "Transaction";
