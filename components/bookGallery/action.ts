'use server'

import { PrismaClient, Prisma, Book } from '@prisma/client'
import { currentUser } from '@clerk/nextjs';
import { generateEmbedding } from '@/components/upload/actions'
import { unstable_cache } from 'next/cache';

import { prismaClient as prisma } from '@/prisma/client';

export const listBooks = unstable_cache(async () => {
  const books = await prisma.book.findMany()

  return books
},
  ['books'],
  { tags: ['books'] }
)



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

