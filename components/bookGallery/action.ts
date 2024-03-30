'use server'

import { PrismaClient, Prisma, Book } from '@prisma/client'
import { currentUser } from '@clerk/nextjs';

const prisma = new PrismaClient()

export const listBooks = async (): Promise<Book[]> => {
  const books = await prisma.book.findMany()
  return books
}

