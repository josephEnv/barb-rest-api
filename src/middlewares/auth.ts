import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { ExtReq } from '../lib/interfaces'

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]
    console.log(req.headers)
    if(!token) res.status(404).json({ msg: 'rel request' })

    try {
        const decoded: any = jwt.verify(token, 'supersecreto')
        if(decoded.role === 1) next()
        else res.status(404).json({ msg: 'algun mensaje' })
    }catch(err){
        res.status(404).json({ msg: 'any message' })
    }
}

export const isLoggedIn = (req: ExtReq, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]

    if(!token) res.status(404).json({
        msg: 'no se ha proporcionado un token'
    })

    jwt.verify(token, 'supersecreto', (err: any, decoded: any)=> {
        if(err) return res.status(404).json({msg: 'invalid token'})

        req.user = decoded
        if(req.user.roleId === 3)
            next()
    })
}