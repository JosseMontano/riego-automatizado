import { Router } from 'express';
import { register, login, changePassword } from '../controllers/authController';

const router = Router();

//@ts-ignore
router.post('/register', register);
//@ts-ignore
router.post('/login', login);
//@ts-ignore
router.post('/change-password', changePassword);

export default router;
