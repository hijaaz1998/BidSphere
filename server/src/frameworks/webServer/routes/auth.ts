import express from 'express';
import authController from '../../../adapters/authController/authController';
import { userDbRepository } from '../../../application/interfaces/userDbRepository'
import { authServiceInterface } from '../../../application/services/authServiceInterface';
import { authService } from '../../services/authService';
import { userRepositoryMongoDb } from '../../databse/repositories/userRepositoryMongoDb';

const authRouter = () => {
    
    const router = express.Router();

    const controller = authController(
        authServiceInterface,
        authService,
        userDbRepository,
        userRepositoryMongoDb
    );

    router.post('/signup', controller.registerUser );
    router.post('/login', controller.loginUser );

    return router;

}

export default authRouter;