import { Router } from 'express';
import UserSignUpController from './UserSignUpController';




const router = Router();

router.post('/signup', UserSignUpController);

export default router;