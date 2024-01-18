import { authService } from "../../frameworks/services/authService";

export const authServiceInterface = (service: ReturnType<AuthService>) => {
    const encryptPassword = (password: string) => {
       return service.encryptPassword(password)
    }

    const generateToken = (payload: string) => service.generateToken(payload);

    const generateTokenAdmin = (id: string) => service.generateTokenAdmin(id)

    const comparePassword = (password: string, hashedPassword: string) => 
        service.comparePassword(password, hashedPassword);
    return {
        encryptPassword,
        generateToken,
        comparePassword
    }
} 

export type AuthService = typeof authService;

export type AuthServiceInterface = typeof authServiceInterface