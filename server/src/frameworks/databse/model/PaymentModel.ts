import mongoose,{ Schema, model } from "mongoose";

const PaymentSchema = new Schema({
    auctionId: {
        type: Schema.Types.ObjectId,
        ref: 'Auction'
    },
    amount: {
        type: Number
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    payer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    auctioner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isConfirmed: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
)

const Payment = model('Payment', PaymentSchema);
export default Payment