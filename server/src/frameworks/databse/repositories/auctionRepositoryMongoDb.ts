import mongoose, {Types} from "mongoose";
import { AuctionEntity, auction } from "../../../entities/auction";
import Auction from "../model/auctionModel";
import Product from "../model/productModel";
import Participants from "../model/ParticipantsModel";
import User from "../model/userModel";
import Notifications from "../model/NotificationModel";
import { log } from "console";


export const auctionRepositoryMongoDb = () => {

    const notificationCheck = async (userID: string | undefined) => {
        try {
            const notificationsToSend = [];
            const auctions = await Auction.find({ endingDate: { $lt: new Date() } });
            console.log("auctions", auctions);
        
            for (const auction of auctions) {
                const participant: any = await Participants.findOne({
                    currentAmount: auction.currentAmount,
                    userId: userID,
                    auctionId: auction._id,
                }).populate('userId');
                console.log("parti", participant);
                if (participant) {
                    console.log("[participant", participant);
        
                    const existingNotification = await Notifications.findOne({
                        reciever: participant.userId._id,
                        auctionId: auction._id
                    });
        
                    if (!existingNotification) {
                        const notification = new Notifications({
                            reciever: participant.userId._id,
                            auctionId: auction._id,
                            message: "Congratulations, You got the Auction!!!"
                        });
                        const created: any = await notification.save();
                        if (created.reciever === userID) {
                            notificationsToSend.push(created);
                        }
                    } else if (existingNotification) {
                        notificationsToSend.push(existingNotification)
                    }
                }
            }
            notificationsToSend.sort((a, b) => b.createdAt - a.createdAt);
            
            console.log("notifto send", notificationsToSend);
        
            return notificationsToSend;
        } catch (error) {
            console.log(error);
            
        }
    };
    

    const addToAuction = async (auction: any) => {
        try {
            const postId = auction.getPostId();
            const currentAmount = auction.getCurrentAmount();
            const startingDate = auction.getStartingDate();
        
            const endingDate = new Date(startingDate);
            endingDate.setMinutes(endingDate.getDate() + 2); // Set endingDate to 2 minutes after startingDate
        
            const newAuction: any = new Auction({
                postId,
                currentAmount,
                startingDate,
                endingDate,
            });
        
            await newAuction.save();
        
            await Product.findByIdAndUpdate(postId, { isAuctioned: true });
        
            return newAuction;
        } catch (error) {
            console.log(error);
            
        }
    };

    const getAuctionsUpcoming = async () => {
        try {
            const auctions = await Auction.find({ 
                isRemoved: false,
                isCompleted: false
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
        try {
            const auctioned = await Product.findById(postId,{isAuctioned})
            return auctioned
        } catch (error) {
            console.log(error);
            
        }
    } 

    const getDetailsOfAuction = async (auctionId: string) => {
        
        try {
            const details = await Auction.findById(auctionId).populate({
                path: 'postId',
                select: 'productName image',
              });
    
              return details
        } catch (error) {
            console.log(error);
            
        }
          
    }

    const bidNow = async (
        userId: string | undefined,
        auctionId: string,
        amount: number
    ) => {
        try {
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
        } catch (error) {
            console.log(error);
            
        }
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
        try {
            const auction = await Auction.findOne({postId})
            return auction?._id
        } catch (error) {
            console.log(error);
            
        };
    }

    const auctionRemove = async (id: string) => {
        try {
            const removed = await Auction.findByIdAndUpdate(id, {isRemoved: true} )

            if(removed){
                return true
            }
        } catch (error) {
            console.log(error);
            
        }
    } 

    const getBids = async (userId: string | undefined) => {
        try {
            const myBids = await Participants.find({ userId })
                .populate({
                    path: 'auctionId',
                    match: { isRemoved: false }, // <-- Add this match condition
                    populate: [
                        {
                            path: 'postId',
                            model: 'Product'
                        },
                        {
                            path: 'winner', // Populate the winner field
                            model: 'User'
                        }
                    ]
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

    const blockAuction = async (auctionId: string) => {
        try {
            const auction = await Auction.findById(auctionId);
            if (!auction) {
                throw new Error("Auction not found");
            }
    
            const updatedAuction = await Auction.findByIdAndUpdate(auctionId,
                { isBlocked: !auction.isBlocked }, { new: true });
    
            return updatedAuction;
        } catch (error) {
            console.log(error);
        }
    }
    
    const readChange = async (userId: string | undefined) => {
        try {
            console.log("userId", userId);
            
            const changed = await Notifications.find({ reciever: userId }).exec();
            console.log("changed", changed);
            
            // Iterate over each notification and update isRead to true
            for (let notification of changed) {
                notification.isRead = true;
                await notification.save(); // Save the updated document
            }
    
            const updated = await Notifications.find({reciever: userId}).populate({
                path: 'auctionId',
                match: { isRemoved: false }, // <-- Add this match condition
                populate: {
                    path: 'postId',
                    model: 'Product'
                }
            })

            return updated
        } catch (error) {
            console.log(error);
        }
    };
      
    const auctionCompleted = async (auctionId: string) => {
        try {
            
            const auction = await Auction.findByIdAndUpdate(auctionId,
                {isCompleted: true}, {new: true})
            console.log("auction",auction);

            const winner = await Participants.findOne({
                currentAmount: auction?.currentAmount,
                auctionId: auction?._id,
            })

            const updated = await Auction.findByIdAndUpdate(auctionId,
                { winner: winner?.userId}, {new: true}).populate({
                    path: 'postId',
                    select: 'productName image',
                  });
            
            return updated
        } catch (error) {
            console.log(error);  
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
        notificationCheck,
        blockAuction,
        readChange,
        auctionCompleted
    }

}

export type AuctionRepositoryMongoDb = typeof auctionRepositoryMongoDb