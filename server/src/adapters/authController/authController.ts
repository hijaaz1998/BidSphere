import asyncHandler from 'express-async-handler';
import {Request,Response} from 'express';
import { UserDbInterface } from '../../application/interfaces/userDbRepository';
import { UserRepositoryMongoDb } from '../../frameworks/databse/repositories/userRepositoryMongoDb';
import { AuthService } from '../../frameworks/services/authService';
import { AuthServiceInterface, authServiceInterface } from '../../application/services/authServiceInterface';
import { UserInterface, createUserInterface } from '../../types/userInterface';

import { userRegister, userLogin } from '../../application/usecases/auth/userAuth';

const authController = (
    authServiceInterface: AuthServiceInterface,
    authServiceImpl: AuthService,
    userDbRepository: UserDbInterface,
    userDbRepositoryImpl: UserRepositoryMongoDb
) => {

    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());

    const registerUser = asyncHandler( async (req: Request, res: Response) => {
        
        const user: UserInterface = req.body;

        const { token, createdUser } = await userRegister(
            user,
            dbRepositoryUser,
            authService
        );        

        res.json({
            status: "success",
            message: 'USer Registered',
            token,
            createdUser,
        });
    });

    const loginUser = asyncHandler( async(req: Request, res: Response) => {
        const {email, password} : {email: string, password: string} = req.body;

        const {token, user } = await userLogin(
            email,
            password,
            dbRepositoryUser,
            authService
        )

        res.json({
            status: "success",
            message: "user retrieved",
            token,
            user
        })

    })

    return {
        registerUser,
        loginUser
    }
}

export default authController;