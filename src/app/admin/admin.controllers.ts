import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

class AdminC {

  async findMany(req: Request, res: Response) {

    const users = await prisma.user.findMany()

    res.status(200).json({
      msg: 'All Users',
      data: users
    })

  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params

    prisma.user.findFirst({
      where: {
        id: id
      }
    })
      .then((vals) => {
        res.status(200).json({
          msg: `the info of ${vals.fullName}`,
          data: vals
        })
      })
      .catch((reason) => {
        res.status(404).json({
          msg: 'User is not found',
          reason: reason
        })
      })
  }

  async createUser(req: Request, res: Response) {
    const { userName, fullName, password, email, roleId, numberPhone, age } = req.body

    const pwd = await bcrypt.hash(password, 40)

    prisma.user.create({
      data: {
        userName,
        fullName,
        password: pwd,
        email,
        roleId,
        numberPhone,
        age,
      }
    })
      .then((vals) => {
        res.status(200).json({
          msg: `${vals.fullName}`,
          data: vals
        })
      })
      .catch((vals) => {
        res.status(502).json({ msg: 'bad request', reason: vals })
      })

  }

}

export default new AdminC
