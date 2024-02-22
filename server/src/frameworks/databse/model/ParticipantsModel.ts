import mongoose,{ Schema, model } from "mongoose";

const ParticipantsSchema = new Schema (
    {
        bidAmount: {
            type: Number
        },
        currentAmount: {
            type: Number
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        auctionId: {
            type: Schema.Types.ObjectId,
            ref: 'Auction'
        }
    }
)

const Participants = model('Participants', ParticipantsSchema);
export default Participants