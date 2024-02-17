import { AuctionInterface } from "../../../types/auctionInterface";
import { AuctionDbInterface, auctionDbRepository } from "../../interfaces/auctionDbRepository";
import { AuctionEntity } from "../../../entities/auction";
import { ProductInterface } from "../../../types/productInterface";
import { auction } from "../../../entities/auction";
import { afterEach } from "node:test";
import { auctionRepositoryMongoDb } from "../../../frameworks/databse/repositories/auctionRepositoryMongoDb";
import expressAsyncHandler from "express-async-handler";


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

export const getMyListing = async (
    auctionRepository: ReturnType<AuctionDbInterface>,
    userId: string | undefined
) => {
    const listings = await auctionRepository.getMyListings(userId)

    return listings
}

export const getIdForAuction = async (
    auctionRepository: ReturnType<AuctionDbInterface>,
    postId: string
) => {
    const id = await auctionRepository.getAuctionId(postId)

    return id;
}

export const auctionRemove = async (
    auctionRepository: ReturnType<AuctionDbInterface>,
    id: string
) => {
    const removed = await auctionRepository.removeAuction(id);
    return removed;
}