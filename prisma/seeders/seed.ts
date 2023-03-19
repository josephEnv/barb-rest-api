import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
    const roleAdmin = await prisma.role.create({
        data: {
            name: 'admin'
        }
    })

    const roleUser = await prisma.role.create({
        data: {
            name: 'user'
        }
    })

    const roleSeller = await prisma.role.create({
        data: {
            name: 'seller'
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
        process.exit(1)
    })