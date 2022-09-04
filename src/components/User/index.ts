import { Router } from 'express'
import { UserSignUpController, UserLoginController } from './UserController'

const router = Router()

router.post('/signup', UserSignUpController)
router.post('/login', UserLoginController)

export default router
