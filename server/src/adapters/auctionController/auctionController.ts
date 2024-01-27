import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { AuctionDbInterface, auctionDbRepository } from '../../application/interfaces/auctionDbRepository';
import { AuctionRepositoryMongoDb } from '../../frameworks/databse/repositories/auctionRepositoryMongoDb';
import { addToAuction, getAuctionsUpcoming, checkAuctioned } from '../../application/usecases/auction/auction';

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


    return {
        addAuction,
        getUpcomingAuctions,
        isAuctioned
    }
}


export default auctionController