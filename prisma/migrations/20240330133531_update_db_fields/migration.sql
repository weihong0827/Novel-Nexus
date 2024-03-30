/*
  Warnings:

  - The `status` column on the `Exchange` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `status` on the `Transaction` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('AVAILABLE', 'UNAVAILABLE', 'ONLOAN');

-- CreateEnum
CREATE TYPE "ExchangeStatus" AS ENUM ('REQUESTED', 'ACCEPTED', 'DECLINED', 'COMPLETED');

-- AlterTable
ALTER TABLE "Exchange" ADD COLUMN     "RequesterMessage" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "ExchangeStatus" NOT NULL DEFAULT 'REQUESTED';

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "book" ADD COLUMN     "status" "BookStatus" NOT NULL DEFAULT 'AVAILABLE';
