"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const auctionSchema = new mongoose_1.Schema({
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
            type: mongoose_1.Schema.Types.ObjectId,
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    currentBidder: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
});
const Auction = (0, mongoose_1.model)('Auction', auctionSchema);
exports.default = Auction;
