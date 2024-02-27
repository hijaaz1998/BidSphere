import { AuctionEntity } from "../../entities/auction";
import { AuctionRepositoryMongoDb } from "../../frameworks/databse/repositories/auctionRepositoryMongoDb";

export const auctionDbRepository = (
    repository: ReturnType<AuctionRepositoryMongoDb>
) => {
    const addAuction = async(auction: any) => {        
        return await repository.addToAuction(auction)
    }

    const getUpcomingAuctions = async () => {
        return await repository.getAuctionsUpcoming()
    }

    const isOnAuction = async (postId: string) => {
        return await repository.isAuctioned(postId)
    }

    const getAuctionDetails = async (auctionId: string) => {
        return await repository.getDetailsOfAuction(auctionId)
    }

    const bidPost = async (
        userId: string | undefined,
        auctionId: string,
        amount: number
        ) => {
            return await repository.bidNow(userId, auctionId, amount)
    }

    const getMyListings = async (userId: string | undefined) => {
        return await repository.getMyListing(userId)
    }

    const getAuctionId = async (postId: string) => {
        return await repository.getIdForAuction(postId)
    }

    const removeAuction = async (id: string) => {
        return await repository.auctionRemove(id);
    }

    const getMyBids = async (userId: string | undefined) => {
        return await repository.getBids(userId)
    }

    const abortBid = async (userId: string | undefined, auctionId: string) => {
        return await repository.bidAbort(userId, auctionId)
    }

    const createNotification = async (userId: string | undefined) => {
        return await repository.notificationCheck(userId)
    }

    const auctionBlock = async (auctionId: string) => {
        return await repository.blockAuction(auctionId)
    }

    const changeRead = async(userId: string | undefined) => {
        return await repository.readChange(userId)
    }

    const completedAuction = async (auctionId: string) => {
        return await repository.auctionCompleted(auctionId)
    }

    return {
        addAuction,
        getUpcomingAuctions,
        isOnAuction,
        getAuctionDetails,
        bidPost,
        getMyListings,
        getAuctionId,
        removeAuction,
        getMyBids,
        abortBid,
        createNotification,
        auctionBlock,
        changeRead,
        completedAuction
    }
}

export type AuctionDbInterface = typeof auctionDbRepository