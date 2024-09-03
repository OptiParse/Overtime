import { hash, compare } from 'bcrypt';
import { prisma } from '../db.js';
import { findUserByEmail } from '../services/user.services.js';
import { generateToken } from '../jwt.js';

const registerUser = async (req, res) => {  // Corrected function name
    const { name, email, password } = req.body;
    let hashedPassword;
    try {
        hashedPassword = await hash(password, 10);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create user', message: error.message });
    }
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({ error: 'Email Already Registered..!' });
    }
    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user', message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = await findUserByEmail(email);
    if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = generateToken({ id: user.id, email: user.email });
    res.json({ token });
};

export { registerUser, loginUser };  // Corrected export statement
