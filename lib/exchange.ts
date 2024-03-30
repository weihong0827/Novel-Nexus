'use server'

import { Prisma, Book, ExchangeStatus, BookStatus } from "@prisma/client"
import { prismaClient as prisma } from '@/prisma/client';
import { currentUser } from '@clerk/nextjs'
import { unstable_cache } from 'next/cache'
import { revalidateTag } from "next/cache";

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
  revalidateTag('myBorrowRequests')

}

export type ExchangeDetails = Prisma.PromiseReturnType<typeof getBorrowRequests>
const getBorrowRequests = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error('User not found')
  }
  return await prisma.exchange.findMany({
    where: {
      requesterId: user.id
    },
    include: {

      book: true,
      requester: true,
      owner: true
    }
  })
}

export const myBorrowRequests = unstable_cache(getBorrowRequests,
  ['myBorrowRequests'],
  { tags: ['myBorrowRequests'] }
)
const getLendRequests = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error('User not found')
  }
  return await prisma.exchange.findMany({
    where: {
      ownerId: user.id
    },
    include: {
      book: true,
      requester: true,
      owner: true
    }
  })
}

export const myLendRequests = unstable_cache(getLendRequests,
  ['myLendRequests'],
  { tags: ['myLendRequests'] }

)

export const acceptExchange = async (exchangeId: number) => {
  const user = await currentUser();
  if (!user) {
    throw new Error('User not found')
  }
  try {
    await prisma.$transaction(async (tx) => {

      const exchange = await tx.exchange.findUnique({
        where: {
          id: exchangeId
        },
        include: {
          book: true
        }
      })
      if (!exchange) {
        throw new Error('Exchange not found')
      }
      if (exchange.ownerId !== user.id) {
        throw new Error('User not authorized')
      }
      await tx.exchange.update({
        where: {
          id: exchangeId
        },
        data: {
          status: ExchangeStatus.ACCEPTED,
          exchangeStartDate: new Date()
        }
      })
      await tx.book.update({
        where: {
          id: exchange.bookId
        },
        data: {
          status: BookStatus.ONLOAN
        }
      })
      // await tx.exchange.updateMany({
      //   where: {
      //     bookId: exchange.bookId,
      //     status: ExchangeStatus.REQUESTED
      //   },
      //   data: {
      //     status: ExchangeStatus.DECLINED
      //   }
      //         })
    })

    revalidateTag('myLendRequests')
    revalidateTag('myBorrowRequests')
  } catch (error) {
    console.error('Error accepting exchange', error)
    throw new Error('Error accepting exchange')
  }
}
export const declineExchange = async (exchangeId: number) => {
  const user = await currentUser();
  if (!user) {
    throw new Error('User not found')
  }
  try {
    await prisma.$transaction(async (tx) => {
      const exchange = await tx.exchange.findUnique({
        where: {
          id: exchangeId
        },
        include: {
          book: true
        }
      })
      if (!exchange) {
        throw new Error('Exchange not found')
      }
      if (exchange.ownerId !== user.id) {
        throw new Error('User not authorized')
      }
      await tx.exchange.update({
        where: {
          id: exchangeId
        },
        data: {
          status: ExchangeStatus.DECLINED
        }
      })
    })
    revalidateTag('myLendRequests')
    revalidateTag('myBorrowRequests')
  } catch (error) {
    console.error('Error declining exchange', error)
    throw new Error('Error declining exchange')
  }
}
export const completeExchange = async (exchangeId: number) => {
  const user = await currentUser();
  if (!user) {
    throw new Error('User not found')
  }
  try {
    await prisma.$transaction(async (tx) => {
      const exchange = await tx.exchange.findUnique({
        where: {
          id: exchangeId
        },
        include: {
          book: true
        }
      })
      if (!exchange) {
        throw new Error('Exchange not found')
      }
      if (exchange.requesterId !== user.id) {
        throw new Error('User not authorized')
      }
      await tx.exchange.update({
        where: {
          id: exchangeId
        },
        data: {
          status: ExchangeStatus.COMPLETED,
          exchangeEndDate: new Date()
        }
      })
      await tx.book.update({
        where: {
          id: exchange.bookId
        },
        data: {
          status: BookStatus.AVAILABLE
        }
      })
      // TODO: Assume the requester has enough credits
      // need to change logic
      await tx.user.update({
        where: {
          id: exchange.ownerId
        },
        data: {
          credits: {
            increment: exchange.book.seedAmount
          }
        }
      })
      await tx.user.update({
        where: {
          id: exchange.requesterId
        },
        data: {
          credits: {
            decrement: exchange.book.seedAmount
          }
        }
      })

    })
    revalidateTag('myLendRequests')
    revalidateTag('myBorrowRequests')
  } catch (error) {
    console.error('Error completing exchange', error)
    throw new Error('Error completing exchange')
  }
}
export const deleteExchange = async (exchangeId: number) => {
  const user = await currentUser();
  if (!user) {
    throw new Error('User not found')
  }
  try {
    await prisma.$transaction(async (tx) => {
      const exchange = await tx.exchange.findUnique({
        where: {
          id: exchangeId
        }
      })
      if (!exchange) {
        throw new Error('Exchange not found')
      }
      if (exchange.ownerId !== user.id && exchange.requesterId !== user.id) {
        throw new Error('User not authorized')
      }
      await tx.exchange.delete({
        where: {
          id: exchangeId
        }
      })
    })
    revalidateTag('myLendRequests')
    revalidateTag('myBorrowRequests')
  } catch (error) {
    console.error('Error deleting exchange', error)
    throw new Error('Error deleting exchange')
  }
}
export const cancelExchange = async (exchangeId: number) => {
  console.log('cancelExchange')
  const user = await currentUser();
  if (!user) {
    throw new Error('User not found')
  }
  try {
    await prisma.$transaction(async (tx) => {
      const exchange = await tx.exchange.findUnique({
        where: {
          id: exchangeId
        }
      })
      if (!exchange) {
        throw new Error('Exchange not found')
      }
      if (exchange.requesterId !== user.id) {
        throw new Error('User not authorized')
      }
      await tx.exchange.update({
        where: {
          id: exchangeId
        },
        data: {
          status: ExchangeStatus.CANCELLED
        }
      })
    })
    revalidateTag('myLendRequests')
    revalidateTag('myBorrowRequests')
  } catch (error) {
    console.error('Error cancelling exchange', error)
    throw new Error('Error cancelling exchange')
  }
}
