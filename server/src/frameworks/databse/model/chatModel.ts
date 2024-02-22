import mongoose, { model, Schema } from 'mongoose'

const chatSchema = new Schema({
    chatName: {
        type: String,
        trim: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    latestMessage: {
        type: mongoose.Types.ObjectId,
        ref: 'Message'
    }
},
{
    timestamps: true
})

const Chat = model('Chat', chatSchema);
export default Chat