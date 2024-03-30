-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "embedding" vector(1536);
