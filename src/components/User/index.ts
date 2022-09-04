import { Router } from 'express';
import { UserSignUpController } from './UserController';




const router = Router();

router.post('/signup', UserSignUpController);

export default router;