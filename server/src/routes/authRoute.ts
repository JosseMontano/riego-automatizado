import { Request, Response, Router } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

const router = Router();

//@ts-ignore
router.post('/register', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado satisfactoriamente' });
    } catch (error) {
        res.status(500).json({ error });
    }
});
//@ts-ignore
router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Email o contraseña invalida' });
        }

        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
        console.log(token);

        res.json({ message: "Inicio de sesion correcto" });
    } catch (error) {
        res.status(500).json({ error });
    }
});
//@ts-ignore
router.post('/change-password', async (req: Request, res: Response) => {
    const { email, oldPassword, newPassword } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(oldPassword))) {
            return res.status(400).json({ message: 'Credenciales invalidas' });
        }

        user.password = newPassword;
        await user.save();

        res.json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error });
    }
});

export default router;
