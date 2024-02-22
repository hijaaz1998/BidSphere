import express from 'express';
import adminAuthController from '../../../adapters/adminController/adminController';
import { authServiceInterface } from '../../../application/services/authServiceInterface';
import { authService } from '../../services/authService';
import { userDbRepository } from '../../../application/interfaces/userDbRepository';
import { userRepositoryMongoDb } from '../../databse/repositories/userRepositoryMongoDb';
import { auctionDbRepository } from '../../../application/interfaces/auctionDbRepository';
import { auctionRepositoryMongoDb } from '../../databse/repositories/auctionRepositoryMongoDb';
import { productDbRepository } from '../../../application/interfaces/productDbRepository';
import { ProductRepositoryMongoDb, productRepositoryMongoDb } from '../../databse/repositories/productRepositoryMongoDb';

const adminRouter = () => {
    const router = express.Router();

    const controller = adminAuthController (
        authServiceInterface,
        authService,
        userDbRepository,
        userRepositoryMongoDb,
        auctionDbRepository,
        auctionRepositoryMongoDb,
        productDbRepository,
        productRepositoryMongoDb
    )

    router.post('/login',controller.loginAdmin)
    router.get('/users',controller.getAllUsers)
    router.patch('/block_user/:userId', controller.blockUser)
    router.get('/getAuctions', controller.getAuctions)
    router.get('/getPosts', controller.getPosts)

     return router
     
}

export default adminRouter