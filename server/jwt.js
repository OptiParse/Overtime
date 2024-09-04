import jwt from 'jsonwebtoken'; // Default import

const { sign, verify } = jwt;
import process from 'process';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.JWT_SECRET;
const expiry = process.env.JWT_TOKEN_EXPIRATION;

function generateToken(payload) {
    // Can set token expiration time here but later we will set it in the .env file
    return sign(payload, secretKey, { expiresIn: expiry });
}

function verifyToken(token) {
    try {
        return verify(token, secretKey);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export {
    generateToken,
    verifyToken
};