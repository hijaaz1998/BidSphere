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
    router.get('/getAuctions', jwtAuth, controller.getUpcomingAuctions)
    router.get('/isOnAuction/:postId', controller.isAuctioned)
    router.get('/auctionDetails/:auctionId', controller.getAuctionDetails)
    router.post('/bid', jwtAuth, controller.bid)
    router.get('/get_my_listings', jwtAuth, controller.getMyListings)
    router.get('/getAuction/:postId', controller.getAuctionId)
    router.patch('/removeAuction/:auctionId', controller.removeAuction)
    router.get('/get_my_bids', jwtAuth,controller.getMyBids)
    router.put('/abort_bid/:id', jwtAuth, controller.abortBid)
    router.get('/notification', jwtAuth, controller.checkNotification)

    return router
}

export default auctionRouter