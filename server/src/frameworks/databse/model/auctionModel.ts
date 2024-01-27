import mongoose,{ Schema, model } from "mongoose";

const auctionSchema = new Schema(
    {
        postId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Product'
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
        }
    }
)

const Auction = model('Auction', auctionSchema);
export default Auction