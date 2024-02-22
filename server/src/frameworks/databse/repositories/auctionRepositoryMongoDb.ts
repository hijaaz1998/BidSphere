import mongoose, {Types} from "mongoose";
import { AuctionEntity, auction } from "../../../entities/auction";
import Auction from "../model/auctionModel";
import Product from "../model/productModel";
import Participants from "../model/ParticipantsModel";
import User from "../model/userModel";
import Notifications from "../model/NotificationModel";


export const auctionRepositoryMongoDb = () => {

    const notificationCheck = async (userId: string | undefined) => {
        const notificationsToSend= [];
        const auctions = await Auction.find({ endingDate: { $lt: new Date() } }); // Find auctions where the ending date is in the past
        for (const auction of auctions) {
            const participant: any= await Participants.findOne({
                auctionId: auction._id,
                currentAmount: auction.currentAmount
            }).populate('userId');
            
            if (participant) {
                // Check if a notification already exists for this auction and participant
                const existingNotification = await Notifications.findOne({
                    receiver: participant.userId._id,
                    auctionId: auction._id
                });
                
                // If no existing notification, create one
                if (!existingNotification) {
                    const notification = new Notifications({
                        receiver: participant.userId._id,
                        auctionId: auction._id,
                        message: "Congradulations, You got the Auction!!!"
                    });
                    const created: any = await notification.save();
                    if (created.receiver.toString() === userId) {
                        notificationsToSend.push(created);
                    }
                }
            }
        }
        return notificationsToSend
    };

    const addToAuction = async (auction: any) => {
        const postId = auction.getPostId();
        const currentAmount = auction.getCurrentAmount();
        const startingDate = auction.getStartingDate();
    
        const endingDate = new Date(startingDate);
        endingDate.setMinutes(endingDate.getMinutes() + 2); // Set endingDate to 2 minutes after startingDate
    
        const newAuction: any = new Auction({
            postId,
            currentAmount,
            startingDate,
            endingDate,
        });
    
        await newAuction.save();
    
        await Product.findByIdAndUpdate(postId, { isAuctioned: true });
    
        return newAuction;
    };

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
        amount: number
    ) => {
        let newParticipant: any;
        let existingParticipant: any;
    
        const auction = await Auction.findByIdAndUpdate(
            auctionId,
            { $inc: { currentAmount: amount } },
            { new: true }
        );
    
        if (!auction) {
            return null;
        }
    
        existingParticipant = await Participants.findOne({ userId, auctionId });
    
        if (existingParticipant) {
            existingParticipant.currentAmount = auction.currentAmount;
            await existingParticipant.save();
        } else {
            newParticipant = new Participants({
                currentAmount: auction.currentAmount,
                userId,
                auctionId: auction._id
            });
            await newParticipant.save();
        }
    
        const isParticipantInAuction = auction.participants.includes(existingParticipant ? existingParticipant._id : newParticipant?._id);
    
        if (!isParticipantInAuction) {
            await Auction.findByIdAndUpdate(
                auctionId,
                { $push: { participants: existingParticipant ? existingParticipant._id : newParticipant?._id } },
                { new: true }
            );
        }
    
        const details = await Auction.findById(auctionId).populate({
            path: 'postId',
            select: 'productName image',
        });
    
        return details;
    }
    
    
    

    const getMyListing = async (userId: string | undefined) => {
        try {
            const products = await Product.find({ userId: userId });
            
            const productIds = products.map(product => product._id);
    
            const auctions = await Auction.find({ 
                $and: [
                    { postId: { $in: productIds } },
                    { isRemoved: false }
                ]
            }).populate({
                path: 'postId',
                populate: {
                    path: 'userId'
                }
            });
            console.log("zuctions", auctions);
            
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

    const getBids = async (userId: string | undefined) => {
        try {
            const myBids = await Participants.find({ userId })
                .populate({
                    path: 'auctionId',
                    match: { isRemoved: false }, // <-- Add this match condition
                    populate: {
                        path: 'postId',
                        model: 'Product'
                    }
                })
                .exec(); // Execute the query to enable filtering in memory
    
            // Filter out documents where auctionId is null
            const filteredBids = myBids.filter(bid => bid.auctionId !== null);
    
            console.log("myBIds", filteredBids);
            return filteredBids;
        } catch (error) {
            console.log(error);
        }
    }
    
    const bidAbort = async (userId: string | undefined, participantId: string) => {
        try {
            const removedParticipant = await Participants.findOneAndDelete({
                _id: participantId
            });
    
            if (!removedParticipant) {
                throw new Error('Participant not found.');
            }
    
            // Step 2: Remove the participant ID from the array in Auction
            const updatedAuction = await Auction.findOneAndUpdate(
                { participants: participantId },
                { $pull: { participants: participantId } },
                { new: true }
            );
    
            if (!updatedAuction) {
                throw new Error('Auction not found.');
            }
    
            console.log('Participant removed:', removedParticipant);
            console.log('Auction updated:', updatedAuction);
            
            return updatedAuction;
        } catch (error) {
            console.log(error);
            throw error;
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
        auctionRemove,
        getBids,
        bidAbort,
        notificationCheck
    }

}

export type AuctionRepositoryMongoDb = typeof auctionRepositoryMongoDb