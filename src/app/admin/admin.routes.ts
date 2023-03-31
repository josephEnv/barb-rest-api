import { Router } from 'express'
import adminControllers from './admin.controllers'
import { isAdmin } from '../../middlewares/auth'
import { Request, Response } from 'express'
const adminRouter: Router = Router()


adminRouter.get('/findUsers', adminControllers.findMany)
adminRouter.get('/findUser/:id', adminControllers.findOne)
adminRouter.get('/testing', isAdmin, (req: Request, res: Response) => {
    res.json({ msg: 'msg' })
})
adminRouter.post('/create', adminControllers.createUser)

export default adminRouter
