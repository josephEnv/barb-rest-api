import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'
import { searchRoleId } from '../lib/search-roleid'

const prisma = new PrismaClient()


const main = async () => {
  const roles = await prisma.role.createMany({
    data: [
      { name: 'admin' },
      { name: 'salesman' },
      { name: 'client' }
    ]
  })

  const users = await prisma.user.create({
    data: {
      fullName: 'joseph pazmiño',
      email: 'joseph@local.com',
      password: await hash('@jose@paz@', 20),
      userName: 'joePaz',
      numberPhone: '80983789798',
      roleId: await searchRoleId('admin'),
      age: 17
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
