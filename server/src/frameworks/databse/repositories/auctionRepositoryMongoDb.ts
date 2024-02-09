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

        await Product.findByIdAndUpdate(postId, {isAuctioned: true})
        
        
        return newAuction
    }

    const getAuctionsUpcoming = async () => {
        const auctions = await Auction.find({})
          .populate({
            path: 'postId',
            populate: {
              path: 'userId',
              model: 'User',
              select: 'firstName lastName', // Fields from the user document
            },
            select: 'productName description image', // Fields from the postId (product) document
          })
          .exec();
      
        return auctions;
    };
      

    const isAuctioned = async (postId: string) => {
        const auctioned = await Product.findById(postId,{isAuctioned})
        return auctioned
    } 

    const getDetailsOfAuction = async (auctionId: string) => {
        
        const details = await Auction.findById(auctionId).populate({
            path: 'postId',
            select: 'productName image',
          });

          console.log("auction", details);
          return details
          
    }

    const bidNow = async (
        userId: string | undefined,
        auctionId: string,
        amount: Number
    ) => {
        const updated = await Auction.updateOne(
            { _id: new mongoose.Types.ObjectId(auctionId) },
            { $inc: { currentAmount: amount } }
        );

        if(updated) {
            const details = await Auction.findById(auctionId).populate({
                path: 'postId',
                select: 'productName image',
              });

              return details
        }
    }


    return {
        addToAuction,
        getAuctionsUpcoming,
        isAuctioned,
        getDetailsOfAuction,
        bidNow
    }

}

export type AuctionRepositoryMongoDb = typeof auctionRepositoryMongoDb