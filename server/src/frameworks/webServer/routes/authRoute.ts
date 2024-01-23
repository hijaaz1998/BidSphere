import express from 'express';
import authController from '../../../adapters/authController/authController';
import { userDbRepository } from '../../../application/interfaces/userDbRepository'
import { authServiceInterface } from '../../../application/services/authServiceInterface';
import { authService } from '../../services/authService';
import { userRepositoryMongoDb } from '../../databse/repositories/userRepositoryMongoDb';
import jwtAuth from '../../../utils/middleware/jwtAuth'

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
    router.get('/get_suggestions', jwtAuth, controller.getSuggestion );
    router.patch('/follow/:followed', jwtAuth, controller.followUser);
    router.post('/googleAuth', controller.googleAuth)

    return router;

}

export default authRouter;