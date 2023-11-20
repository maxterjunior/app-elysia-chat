import jwt from 'jsonwebtoken';
import { tokensStore } from './store';

const secret = process.env.JWT_SECRET || 'default_secret';

export const generateToken = (payload: any) => {
    return jwt.sign(payload, secret, { expiresIn: '10s' });
};

export const verifyToken = (token: string) => {
    // return jwt.verify(token, secret);
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        tokensStore.delete(token);
        throw error
    }
};

export const decodeToken = (token: string) => {
    return jwt.decode(token);
};