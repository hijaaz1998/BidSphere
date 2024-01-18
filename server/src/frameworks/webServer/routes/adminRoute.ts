import express from 'express';
import adminAuthController from '../../../adapters/adminController/adminController';
import { authServiceInterface } from '../../../application/services/authServiceInterface';
import { authService } from '../../services/authService';
import { userDbRepository } from '../../../application/interfaces/userDbRepository';
import { userRepositoryMongoDb } from '../../databse/repositories/userRepositoryMongoDb';

const adminRouter = () => {
    const router = express.Router();

    const controller = adminAuthController (
        authServiceInterface,
        authService,
        userDbRepository,
        userRepositoryMongoDb
    )

    router.post('/login',controller.loginAdmin)
    router.get('/users',controller.getAllUsers)
    router.patch('/block_user/:userId', controller.blockUser)

     return router
     
}

export default adminRouter