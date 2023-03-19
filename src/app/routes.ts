import { Router } from 'express'
import authRouter from './auth/auth.routes'
const router: Router = Router()


//AUTH ROUTES
router.use(authRouter)

export default router