import mongoose, {Types} from "mongoose";
import { AuctionEntity, auction } from "../../../entities/auction";
import Auction from "../model/auctionModel";
import Product from "../model/productModel";


export const auctionRepositoryMongoDb = () => {

    const addToAuction = async(auction: any) => {   

        const postId = auction.getPostId();
        const currentAmount = auction.getCurrentAmount();
        const startingDate =  auction.getStartingDate();

        const newAuction: any = new Auction({
            postId,
            currentAmount,
            startingDate
        })

        await newAuction.save();

        const product = await Product.findByIdAndUpdate(postId, {isAuctioned: true})
        
        
        return newAuction
    }

    const getAuctionsUpcoming = async () => {
        const auctions = await Auction.find({})
            .populate('postId', 'productName description image') // Replace 'productName', 'otherField1', 'otherField2' with the actual fields you want to populate
            .exec();
    
        return auctions;
    };

    const isAuctioned = async (postId: string) => {
        const auctioned = await Product.findById(postId,{isAuctioned})
        return auctioned
    } 


    return {
        addToAuction,
        getAuctionsUpcoming,
        isAuctioned
    }

}

export type AuctionRepositoryMongoDb = typeof auctionRepositoryMongoDb