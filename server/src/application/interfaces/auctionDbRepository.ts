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

    return {
        addAuction,
        getUpcomingAuctions,
        isOnAuction
    }
}

export type AuctionDbInterface = typeof auctionDbRepository