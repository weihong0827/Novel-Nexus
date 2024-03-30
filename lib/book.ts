'use server'

import { BookCreate, TFormValues } from "@/types/book";
import { Book } from '@prisma/client'
import { currentUser } from '@clerk/nextjs';
import { openai } from '@/lib/openai'
import { revalidateTag } from 'next/cache'
import { prismaClient as prisma } from '@/prisma/client';

import { unstable_cache } from 'next/cache';


export const listBooks = unstable_cache(async () => {
  const books = await prisma.book.findMany()

  return books
},
  ['books'],
  { tags: ['books'] }
)

export const getOwnListing = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error('User not found')
  }
  return await prisma.book.findMany({
    where: {
      ownerId: user.id
    }
  })
}
export const getBook = async (id: number) => {
  return await prisma.book.findUnique({
    where: {
      id
    }
  })
}



export async function searchBook(
  query: string
): Promise<Array<Book & { similarity: number }>> {
  try {
    if (query.trim().length === 0) return []

    const embedding = await generateEmbedding(query)
    const vectorQuery = `[${embedding.join(',')}]`
    const book = await prisma.$queryRaw`
      SELECT
        id,
        "title",
        1 - (embedding <=> ${vectorQuery}::vector) as similarity
      FROM book
      where 1 - (embedding <=> ${vectorQuery}::vector) > .5
      ORDER BY  similarity DESC
      LIMIT 8;
    `

    return book as Array<Book & { similarity: number }>
  } catch (error) {
    console.error(error)
    throw error
  }
}



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
