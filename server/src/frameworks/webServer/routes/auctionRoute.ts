import express from 'express';
import auctionController from '../../../adapters/auctionController/auctionController';
import { auctionDbRepository } from '../../../application/interfaces/auctionDbRepository';
import { auctionRepositoryMongoDb } from '../../databse/repositories/auctionRepositoryMongoDb';



const auctionRouter = () => {
    const router = express.Router();

    const controller = auctionController(
        auctionDbRepository,
        auctionRepositoryMongoDb
    );

    router.post('/addToAuction', controller.addAuction)
    router.get('/getAuctions', controller.getUpcomingAuctions)
    router.get('/isOnAuction/:postId', controller.isAuctioned)

    return router
}

export default auctionRouter