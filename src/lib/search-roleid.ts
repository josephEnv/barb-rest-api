import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const searchRoleId = async (roleName: string) => {
  const role = await prisma.role.findFirst({
    where: {
      name: roleName
    }
  })

  return role.id
}
