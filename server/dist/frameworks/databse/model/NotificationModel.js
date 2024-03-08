"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NotificationSchema = new mongoose_1.Schema({
    reciever: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    auctionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Auction'
    },
    message: {
        type: String
    },
    isRead: {
        type: Boolean,
        default: false
    }
});
const Notifications = (0, mongoose_1.model)('Notifications', NotificationSchema);
exports.default = Notifications;
