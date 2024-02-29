import mongoose,{ Schema, model } from "mongoose";

const auctionSchema = new Schema(
    {
        postId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
        startingAmount: {
            type: Number
        },
        currentAmount: {
            type: Number
        },
        createdOn: {
            type: Date,
            default: new Date()
        },
        startingDate: {
            type: Date
        },
        endingDate: {
            type: Date
        },
        isRemoved: {
            type: Boolean,
            default: false
        },
        participants: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Participants'
            }
        ],
        isCompleted: {
            type: Boolean,
            default: false
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true
        },
        winner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        } 
    }
)

const Auction = model('Auction', auctionSchema);
export default Auction