/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Exchange" DROP CONSTRAINT "Exchange_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Exchange" DROP CONSTRAINT "Exchange_requesterId_fkey";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "owner" TEXT[];

-- AlterTable
ALTER TABLE "Exchange" ADD COLUMN     "owner" TEXT[],
ADD COLUMN     "requester" TEXT[];

-- DropTable
DROP TABLE "User";
