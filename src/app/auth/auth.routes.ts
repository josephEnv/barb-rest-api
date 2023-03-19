import { Router } from 'express'
import authController from './auth.controller'

const authRouter: Router = Router()

authRouter.post('/register', authController.Register)
authRouter.post('/login', authController.Login)
authRouter.post('/logOut', authController.LogOut)
authRouter.put('/resetPwd', authController.ResetPwd)
authRouter.put('/forgotPwd', authController.ForgotPwd)


export default authRouter