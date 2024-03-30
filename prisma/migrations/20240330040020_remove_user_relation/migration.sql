/*
  Warnings:

  - You are about to drop the column `owner` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `owner` on the `Exchange` table. All the data in the column will be lost.
  - You are about to drop the column `requester` on the `Exchange` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "owner",
ALTER COLUMN "ownerId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Exchange" DROP COLUMN "owner",
DROP COLUMN "requester",
ALTER COLUMN "requesterId" SET DATA TYPE TEXT,
ALTER COLUMN "ownerId" SET DATA TYPE TEXT;
