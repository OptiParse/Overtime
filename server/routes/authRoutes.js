import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/authControllers.js';  // Combined import statement

const router = Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Auth routes');
});

router.post('/signup', registerUser);
router.post('/login', loginUser);

export default router;
