import { AuctionInterface } from "../../../types/auctionInterface";
import { AuctionDbInterface } from "../../interfaces/auctionDbRepository";
import { AuctionEntity } from "../../../entities/auction";
import { ProductInterface } from "../../../types/productInterface";
import { auction } from "../../../entities/auction";


export const addToAuction = async (
    data: any,
    auctionRepository: ReturnType<AuctionDbInterface>
) => {
    const {postId, auctionDate, basePrice} = data;

    const auctionEntity: AuctionEntity = auction(
        postId,
        basePrice,
        auctionDate
    )

    const createdAuction: AuctionEntity | null = await auctionRepository.addAuction(auctionEntity)

    return createdAuction
}

export const getAuctionsUpcoming = async(
    auctionRepository: ReturnType<AuctionDbInterface>
) => {
    const auctions = await auctionRepository.getUpcomingAuctions();

    return auctions
}

export const checkAuctioned = async(
    auctionRepository: ReturnType<AuctionDbInterface>,
    postId: string
) => {
    const isAuctioned = await auctionRepository.isOnAuction(postId);

    return isAuctioned
}

export const getDetailsOfAuction = async (
    auctionRepository: ReturnType<AuctionDbInterface>,
    auctionId: string
) => {
    const details = await auctionRepository.getAuctionDetails(auctionId);

    return details;
}

export const bidNow = async (
    auctionRepository: ReturnType<AuctionDbInterface>,
    userId: string | undefined,
    auctionId: string,
    amount: Number
) => {
    const updated = await auctionRepository.bidPost(userId, auctionId, amount)

    return updated
}