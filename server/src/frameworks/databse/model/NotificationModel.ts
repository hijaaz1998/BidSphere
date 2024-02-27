import mongoose,{ Schema, model } from "mongoose";

const NotificationSchema = new Schema ({
    reciever: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },
    auctionId: {
        type: Schema.Types.ObjectId,
        ref: 'Auction'
    },
    message: {
        type: String
    },
    isRead: {
        type: Boolean,
        default: false
    }
})

const Notifications = model('Notifications', NotificationSchema);
export default Notifications