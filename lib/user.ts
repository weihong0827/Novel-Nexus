'use server'

import { PrismaClient, Prisma ,User} from '@prisma/client'

import { currentUser } from '@clerk/nextjs';
const prisma = new PrismaClient()
export const getUser = async (): Promise<User>=> {
  const user = await currentUser();
  if (!user) {
    throw new Error('User not found')
  }
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id
    }
      })
  if (!dbUser) {
    throw new Error('User not found')
  }
return dbUser
  
}

