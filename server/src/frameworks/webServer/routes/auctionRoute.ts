import express from 'express';
import auctionController from '../../../adapters/auctionController/auctionController';
import { auctionDbRepository } from '../../../application/interfaces/auctionDbRepository';
import { auctionRepositoryMongoDb } from '../../databse/repositories/auctionRepositoryMongoDb';
import jwtAuth from '../../../utils/middleware/jwtAuth';


const auctionRouter = () => {
    const router = express.Router();

    const controller = auctionController(
        auctionDbRepository,
        auctionRepositoryMongoDb
    );

    router.post('/addToAuction', controller.addAuction)
    router.get('/getAuctions', controller.getUpcomingAuctions)
    router.get('/isOnAuction/:postId', controller.isAuctioned)
    router.get('/auctionDetails/:auctionId', controller.getAuctionDetails)
    router.post('/bid', jwtAuth, controller.bid)

    return router
}

export default auctionRouter