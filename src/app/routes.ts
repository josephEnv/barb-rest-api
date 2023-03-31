import { Router } from 'express'
import authRouter from './auth/auth.routes'
import adminRouter from './admin/admin.routes'
const router: Router = Router()


//AUTH ROUTES
router.use(authRouter)

//ADMIN ROUTES
router.use(adminRouter)

export default router
