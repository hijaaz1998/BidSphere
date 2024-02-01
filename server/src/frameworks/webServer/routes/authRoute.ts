import express from 'express';
import authController from '../../../adapters/authController/authController';
import { userDbRepository } from '../../../application/interfaces/userDbRepository'
import { authServiceInterface } from '../../../application/services/authServiceInterface';
import { authService } from '../../services/authService';
import { userRepositoryMongoDb } from '../../databse/repositories/userRepositoryMongoDb';
import jwtAuth from '../../../utils/middleware/jwtAuth'
import checkBlocked from '../../../utils/middleware/checkBlocked';

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
    router.post('/googleAuth', controller.googleAuth);
    router.patch('/unfollow/:unfollowedId', jwtAuth, controller.unfollow)
    router.post('/get_otp', controller.getOtp)
    router.post('/set_new_password', controller.changePassword);
    router.get('/getFollowing', jwtAuth, controller.getFollowing);
    router.get('/getFollowers', jwtAuth, controller.getFollowers);

    return router;

}

export default authRouter;