
'use server'
import { BookCreate, TFormValues } from "@/types/book";
import { PrismaClient, Prisma } from '@prisma/client'
import { currentUser } from '@clerk/nextjs';
import { openai } from '@/lib/openai'
import { revalidateTag } from 'next/cache'
const prisma = new PrismaClient()


export const createBook = async (book: BookCreate) => {
  console.log(book)
  const user = await currentUser();
  if (!user) {
    throw new Error('User not found')
  }
  const embedding = await generateEmbedding(
    "title: " + book.name + " " + "author: " + book.author
    + " " + "genre: " + book.genre
    + " " + "description: " + book.description + " "
  )
  try {

    prisma.$transaction(async (tx) => {
      // Create a new book
      const newBook = await tx.book.create({
        data: {
          title: book.name,
          seedAmount: book.seed,
          author: book.author,
          genre: book.genre,
          condition: book.condition,
          description: book.description,
          image: book.bookImages,
          ownerId: user.id,
        }
      }
      )
      await tx.$executeRaw`UPDATE book
          SET embedding = ${embedding}::vector
          WHERE id = ${newBook.id}`
      console.log(newBook)
      revalidateTag('books')
    })
  } catch (error) {
    console.error('Error creating book', error)
    throw new Error('Error creating book')
  }
}
export async function generateEmbedding(raw: string) {
  // OpenAI recommends replacing newlines with spaces for best results
  const input = raw.replace(/\n/g, ' ')
  const embeddingData = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input,
  })
  const [{ embedding }] = (embeddingData as any).data
  return embedding
}
