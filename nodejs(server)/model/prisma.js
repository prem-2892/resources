import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createUser = async (data) => {
  try {
    return await prisma.user.create({
      data,
    })
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}
