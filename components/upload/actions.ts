
'use server'
import { TFormValues } from "@/types/book";
import { PrismaClient, Prisma } from '@prisma/client'
import { currentUser } from '@clerk/nextjs';

const prisma = new PrismaClient()

export const createBook = async (book: TFormValues) => {
  const user = await currentUser();
  if (!user) {
    throw new Error('User not found')
  }
  // Create a new book
  const newBook = await prisma.book.create({
    data: {
      title: book.name,
      author: book.author,
      genre: book.genre,
      condition: book.condition,
      description: book.description,
      ownerId: user.id,
    }
  }
  )
  console.log(newBook)
}
