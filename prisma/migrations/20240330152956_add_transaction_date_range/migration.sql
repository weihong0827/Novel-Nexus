-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "transactionEnd" TIMESTAMP(3),
ADD COLUMN     "transactionStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
