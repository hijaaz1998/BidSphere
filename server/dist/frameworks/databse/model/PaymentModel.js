"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PaymentSchema = new mongoose_1.Schema({
    auctionId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    auctioner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    isConfirmed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
const Payment = (0, mongoose_1.model)('Payment', PaymentSchema);
exports.default = Payment;
