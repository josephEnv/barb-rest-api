import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt, { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { searchRoleId } from '../../lib/search-roleid'


const prisma = new PrismaClient()

class AuthC {

  async Register(req: Request, res: Response) {
    const { userName, fullName, password, email, numberPhone, age } = req.body

    const AgeInt = parseInt(age, 10)

    const register = await prisma.user.create({
      data: {
        userName,
        fullName,
        email,
        numberPhone,
        password: await bcrypt.hash(password, 5),
        age: AgeInt,
        roleId: await searchRoleId('client')
      }
    })

    res.send({
      msg: 'done request',
      data: register
    })
  }

  async Login(req: Request, res: Response) {
    const { email, password } = req.body

    await prisma.user.findUnique({
      where: {
        email
      }
    })
      .then((vals) => {
        const verifyPass = compare(password, vals.password)
        if (!verifyPass) res.status(404).json({ msg: 'password is incorrect' })

        const token = jwt.sign({ user: vals.userName, role: vals.roleId }, 'supersecreto', { expiresIn: '1h' })

        res.setHeader('authorization', `Bearer ${token}`)

        res.status(200).json({
          msg: 'user has been logged in'
        })
      })
      .catch((reason) => {
        res.status(404).json({ reason: reason })
      })

  }

  LogOut(req: Request, res: Response) {
    res.send('logOut endpoint')
  }

  ForgotPwd(req: Request, res: Response) {
    res.send('forgot endpoint')
  }

  ResetPwd(req: Request, res: Response) {
    res.send('reset endpoint')
  }

}

export default new AuthC
