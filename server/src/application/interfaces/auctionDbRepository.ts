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
        amount: Number
        ) => {
            return await repository.bidNow(userId, auctionId, amount)
        }

    return {
        addAuction,
        getUpcomingAuctions,
        isOnAuction,
        getAuctionDetails,
        bidPost
    }
}

export type AuctionDbInterface = typeof auctionDbRepository