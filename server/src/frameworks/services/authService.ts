import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import configKeys from '../../config';

export const authService = () => {
    
    const encryptPassword = async (password: string) => {
        console.log(password);
        
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password,salt);
        return password
    }

    const generateToken = (payload: string) => {
        const token = jwt.sign({ payload }, configKeys.JWT_SECRET, {
            expiresIn: '5d',
        });
        return token
    }

    return {
        encryptPassword,
        generateToken
    }
}

export type AuthService = typeof authService;
