import { authService } from "../../frameworks/services/authService";

export const authServiceInterface = (service: ReturnType<AuthService>) => {
    const encryptPassword = (password: string) => {
       return service.encryptPassword(password)
    }

    const generateToken = (payload: string) => service.generateToken(payload);

    return {
        encryptPassword,
        generateToken
    }
} 

export type AuthService = typeof authService;

export type AuthServiceInterface = typeof authServiceInterface