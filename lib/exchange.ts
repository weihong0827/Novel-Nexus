'use server'

import { Prisma, PrismaClient, Book, ExchangeStatus } from "@prisma/client"
import { prismaClient as prisma } from '@/prisma/client';
import { currentUser } from '@clerk/nextjs'


export const exchange = async (book: Book, message: string | null) => {
  const user = await currentUser();
  if (!user) {
    throw new Error('User not found')
  }
  await prisma.exchange.create({
    data: {
      bookId: book.id,
      RequesterMessage: message,
      ownerId: book.ownerId,
      requesterId: user.id,
      status: ExchangeStatus.REQUESTED
    }
  })
}
