import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

class AuthC {

    async Register(req: Request, res: Response){
        const { name, password, email, number, age } = req.body

        const searchRoleId = async (role) => {
            const roleId = await prisma.role.findFirst({
                where: {
                    name: role
                }
            })

            return roleId.id
        }
        
        const register = await prisma.user.create({
            data: {
                fullName: name,
                email: email,
                numberPhone: number,
                password: await bcrypt.hash(password, 5) ,
                age: age,
                roleId: await searchRoleId('user')
            }
        })

        res.send({
            msg: 'done request',
            data: register
        })
    }

    async Login(req: Request, res: Response){
        const { email, password } = req.body

        const user =  await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!user) res.status(400).json({message: 'user is not in the database'})

        const validPwd = await bcrypt.compare(password, user.password)

        if(!validPwd) res.status(400).json({message: 'password is incorrect'})

        const token = jwt.sign({userId: user.id}, 'supersecreto', {expiresIn: '1h'})

        res.json({ user, token })
    }

    LogOut(req: Request, res: Response){
        res.send('logOut endpoint')
    }
    
    ForgotPwd(req: Request, res: Response){
        res.send('forgot endpoint')
    }

    ResetPwd(req: Request, res: Response) {
        res.send('reset endpoint')
    }

}

export default new AuthC