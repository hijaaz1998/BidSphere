import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { AuctionDbInterface, auctionDbRepository } from '../../application/interfaces/auctionDbRepository';
import { AuctionRepositoryMongoDb } from '../../frameworks/databse/repositories/auctionRepositoryMongoDb';
import { addToAuction, getAuctionsUpcoming, checkAuctioned, getDetailsOfAuction, bidNow, getMyListing, getIdForAuction, auctionRemove } from '../../application/usecases/auction/auction';

interface AuthenticatedRequest extends Request { // Rename the interface to avoid naming conflict
    userId?: string;
}

const auctionController = (
    auctionDbRepository: AuctionDbInterface,
    auctionDbRepositoryImpl: AuctionRepositoryMongoDb
) => {

    const dbRepositoryAuction = auctionDbRepository(auctionDbRepositoryImpl())

    const addAuction = asyncHandler ( async (req: Request, res: Response) => {
        const data = req.body.data;
        console.log("data",data);
        

        const created = await addToAuction(data,dbRepositoryAuction)

        res.json({
            created
        })
    })

    const getUpcomingAuctions = asyncHandler ( async (req: Request, res: Response) => {
        const upcomingAuctions = await getAuctionsUpcoming(dbRepositoryAuction)

        console.log("upcomingAuctions",upcomingAuctions);

        res.json({
            upcomingAuctions
        })
    })

    const isAuctioned = asyncHandler( async (req: Request, res: Response) => {
        const postId = req.params.postId
        const auctioned = await checkAuctioned(dbRepositoryAuction, postId)

        res.json({
            auctioned
        })
    })

    const getAuctionDetails = asyncHandler( async (req: Request, res: Response) => {
        const auctionId = req.params.auctionId;
        const details = await getDetailsOfAuction(dbRepositoryAuction, auctionId)

        res.json({
            details
        })
    })

    const bid = asyncHandler ( async ( req: AuthenticatedRequest, res: Response) => {
        const userId = req.userId;
        const {auctionId, amount } = req.body;

        const auctionID = auctionId.auctionId;
        console.log(auctionId.auctionId);
        console.log(amount);
        

        const updated = await bidNow(dbRepositoryAuction, userId, auctionID, amount)

        res.json({
            updated
        })
    })

    const getMyListings = asyncHandler (async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.userId;

        const listings = await getMyListing(dbRepositoryAuction, userId)
        
        res.json({
            listings
        })
        
    })

    const getAuctionId = asyncHandler ( async (req: Request, res: Response) => {
        const postId = req.params.postId;
        const id = await getIdForAuction(dbRepositoryAuction, postId)

        res.json({
            id
        })
    })

    const removeAuction = asyncHandler ( async (req: Request, res: Response) => {
        const id = req.params.auctionId
        const removed = await auctionRemove(dbRepositoryAuction, id)

        res.json({
            removed: true
        })
    })

    return {
        addAuction,
        getUpcomingAuctions,
        isAuctioned,
        getAuctionDetails,
        bid,
        getMyListings,
        getAuctionId,
        removeAuction
    }
}

export default auctionController