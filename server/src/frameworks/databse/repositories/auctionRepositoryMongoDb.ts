import mongoose, {Types} from "mongoose";
import { AuctionEntity, auction } from "../../../entities/auction";
import Auction from "../model/auctionModel";
import Product from "../model/productModel";


export const auctionRepositoryMongoDb = () => {
    const addToAuction = async (auction: any) => {   

        const postId = auction.getPostId();
        const currentAmount = auction.getCurrentAmount();
        const startingDate =  auction.getStartingDate();
    
        const endingDate = new Date(startingDate);
        endingDate.setDate(endingDate.getDate() + 10);
    
        const newAuction: any = new Auction({
            postId,
            currentAmount,
            startingDate,
            endingDate,
        });
    
        await newAuction.save();
    
        await Product.findByIdAndUpdate(postId, {isAuctioned: true});
        
        return newAuction;
    }
    

    const getAuctionsUpcoming = async () => {
        try {
            const auctions = await Auction.find({ 
                isRemoved: false
            })
            .populate({
                path: 'postId',
                populate: {
                    path: 'userId',
                    model: 'User',
                    select: 'firstName lastName',
                },
                select: 'productName description image',
            })
            .exec();
    
            return auctions;
        } catch (error) {
            console.error('Error fetching upcoming auctions:', error);
            throw error;
        }
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

    const getMyListing = async (userId: string | undefined) => {
        try {
            const products = await Product.find({ userId: userId });
            const productIds = products.map(product => product._id);
    
            const auctions = await Auction.find({ 
                $and: [
                    { postId: { $in: productIds } }, // Check if postId is in productIds array
                    { isAuctioned: false } // Check if isAuctioned is false
                ]
            }).populate({
                path: 'postId',
                populate: {
                    path: 'userId'
                }
            });
            
            return auctions;
        } catch (error) {
            console.error('Error fetching auctions:', error);
            throw error;
        }
    }
    

    const getIdForAuction = async ( postId: string) => {
        const auction = await Auction.findOne({postId})
        return auction?._id;
    }

    const auctionRemove = async (id: string) => {
        const removed = await Auction.findByIdAndUpdate(id, {isRemoved: true} )

        if(removed){
            return true
        }
    } 

    return {
        addToAuction,
        getAuctionsUpcoming,
        isAuctioned,
        getDetailsOfAuction,
        bidNow,
        getMyListing,
        getIdForAuction,
        auctionRemove
    }

}

export type AuctionRepositoryMongoDb = typeof auctionRepositoryMongoDb