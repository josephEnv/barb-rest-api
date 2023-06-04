import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { ExtReq } from '../lib/interfaces'
import { body, validationResult } from 'express-validator'

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]
  console.log(req.headers)
  if (!token) res.status(404).json({ msg: 'rel request' })

  try {
    const decoded: any = jwt.verify(token, 'supersecreto')
    if (decoded.role === 1) next()
    else res.status(404).json({ msg: 'algun mensaje' })
  } catch (err) {
    res.status(404).json({ msg: 'any message' })
  }
}

export const isLoggedIn = (req: ExtReq, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) res.status(404).json({
    msg: 'no se ha proporcionado un token'
  })

  jwt.verify(token, 'supersecreto', (err: any, decoded: any) => {
    if (err) return res.status(404).json({ msg: 'invalid token' })

    req.user = decoded
    if (req.user.roleId === 3)
      next()
  })
}

export const ValidationFields = [
  body('userName').notEmpty().withMessage('user name is required'),
  body('fullName').notEmpty().withMessage('full Name is required'),
  body('password').notEmpty().withMessage('password is required'),
  body('email').notEmpty().isEmail().withMessage('email is required'),
  body('numberPhone').notEmpty().withMessage('Number Phone is required'),
  body('age').notEmpty().withMessage('Age is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const err = validationResult(req)
    if (!err.isEmpty()) {
      return res.status(400).json({ err: err.array() })
    }
    next()
  }
]
