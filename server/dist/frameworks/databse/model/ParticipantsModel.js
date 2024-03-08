"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ParticipantsSchema = new mongoose_1.Schema({
    bidAmount: {
        type: Number
    },
    currentAmount: {
        type: Number
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    auctionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Auction'
    }
});
const Participants = (0, mongoose_1.model)('Participants', ParticipantsSchema);
exports.default = Participants;
