import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { AuctionDbInterface, auctionDbRepository } from '../../application/interfaces/auctionDbRepository';
import { AuctionRepositoryMongoDb } from '../../frameworks/databse/repositories/auctionRepositoryMongoDb';
import { addToAuction, getAuctionsUpcoming, checkAuctioned, getDetailsOfAuction, updatePayment, bidNow, getMyListing, getIdForAuction, paymentGateway, auctionRemove, getBids, bidAbort, notification, readChange, auctionCompleted } from '../../application/usecases/auction/auction';
import { auction } from '../../entities/auction';
import { paymentVerify } from '../../utils/middleware/razorPay';

interface AuthenticatedRequest extends Request { // Rename the interface to avoid naming conflict
    userId?: string;
}

const auctionController = (
    auctionDbRepository: AuctionDbInterface,
    auctionDbRepositoryImpl: AuctionRepositoryMongoDb
) => {

    const dbRepositoryAuction = auctionDbRepository(auctionDbRepositoryImpl())

    const addAuction = asyncHandler ( async (req: Request, res: Response) => {
        try {
            const data = req.body.data;

            const created = await addToAuction(data,dbRepositoryAuction)

            res.json({
                created
            })
        } catch (error) {
            console.log(error);
            
        }
    })

    const getUpcomingAuctions = asyncHandler ( async (req: Request, res: Response) => {
        try {
            const upcomingAuctions = await getAuctionsUpcoming(dbRepositoryAuction);
            res.json({
                upcomingAuctions
            })
        } catch (error) {
            console.log(error);
            
        }
    })

    const isAuctioned = asyncHandler( async (req: Request, res: Response) => {
        try {
            const postId = req.params.postId
            const auctioned = await checkAuctioned(dbRepositoryAuction, postId)

            res.json({
                auctioned
            })
        } catch (error) {
            console.log(error)
        }
    })

    const getAuctionDetails = asyncHandler( async (req: Request, res: Response) => {
        try {
            const auctionId = req.params.auctionId;
            const details = await getDetailsOfAuction(dbRepositoryAuction, auctionId)

            res.json({
                details
            })
        } catch (error) {
            console.log(error)
        }
    })

    const bid = asyncHandler ( async ( req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = req.userId;
            const {auctionId, amount } = req.body;

            const auctionID = auctionId;
        
            const updated = await bidNow(dbRepositoryAuction, userId, auctionID, amount)

            res.json({
                updated
            })
        } catch (error) {
            console.log(error)
        }
    })

    const getMyListings = asyncHandler (async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = req.userId;

            const listings = await getMyListing(dbRepositoryAuction, userId)
            
            res.json({
                listings
            })
        } catch (error) {
            console.log(error)
        }
        
    })

    const getAuctionId = asyncHandler ( async (req: Request, res: Response) => {
        try {
            const postId = req.params.postId;
            const id = await getIdForAuction(dbRepositoryAuction, postId)

            res.json({
                id
            })
        } catch (error) {
            console.log(error)
        }
    })

    const removeAuction = asyncHandler ( async (req: Request, res: Response) => {
        try {
            const id = req.params.auctionId
            const removed = await auctionRemove(dbRepositoryAuction, id)

            res.json({
                removed: true
            })
        } catch (error) {
            console.log(error)
        }
    })

    const getMyBids = asyncHandler ( async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = req.userId;

            const myBids = await getBids(dbRepositoryAuction, userId)

            res.json({
                myBids
            })
        } catch (error) {
            console.log(error)    
        }
    })

    const abortBid = asyncHandler( async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = req.userId;
            const auctionId = req.params.id
            const myBids = await bidAbort(dbRepositoryAuction, userId, auctionId)

            res.json({
                myBids
            })
        } catch (error) {
            console.log(error)
        }
    })

    const checkNotification = asyncHandler( async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = req.userId;
            const created = await notification(dbRepositoryAuction, userId)
            res.json({created})
        } catch (error) {
            console.log(error);
            
        }
    })

    const changeRead = asyncHandler ( async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = req.userId        
            const updated = await readChange(dbRepositoryAuction, userId)

            res.json({
                updated
            })
        } catch (error) {
            console.log(error);
            
        }
    })

    const completedAuction = asyncHandler ( async (req: Request, res: Response) => {
        try {
            const auctionId = req.params.id
            const updated = await auctionCompleted(dbRepositoryAuction,auctionId)

            res.json({
                updated
            })
        } catch (error) {
            console.log(error)
        }
    } )

    const payment = asyncHandler (async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = req.userId
            const auctionId = req.params.id;
            const paid = await paymentGateway(dbRepositoryAuction, userId, auctionId )        
            
            res.json({
            paid: paid?.order,
            paymentId: paid?.id,
                auctionId
            })
        } catch (error) {
            console.log(error)
        }
        
    })

    const verifyPayment = asyncHandler( async (req: AuthenticatedRequest, res: Response) => {
        try {
            const details = req.body;
            const auctionId = req.body.auctionId
            const userId = req.userId
            const paymentId = req.body.paymentId

            const response = await paymentVerify(details);

            if(response){
                const update = await updatePayment(dbRepositoryAuction, userId, auctionId, paymentId)
                res.json({update})
            }
        } catch (error) {
            console.log(error)
        }
        
    })

    return {
        addAuction,
        getUpcomingAuctions,
        isAuctioned,
        getAuctionDetails,
        bid,
        getMyListings,
        getAuctionId,
        removeAuction,
        getMyBids,
        abortBid,
        checkNotification,
        changeRead,
        completedAuction,
        payment,
        verifyPayment
    }
}

export default auctionController


