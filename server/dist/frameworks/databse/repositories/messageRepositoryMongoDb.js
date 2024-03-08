"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRepositoryMongoDb = void 0;
const chatModel_1 = __importDefault(require("../model/chatModel")); // Assuming ChatDocument is the type of a document in your Mongoose model
const userModel_1 = __importDefault(require("../model/userModel"));
const MessageModel_1 = __importDefault(require("../model/MessageModel"));
const messageRepositoryMongoDb = () => {
    const chatAccess = async (userId, receiver) => {
        try {
            let isChat = await chatModel_1.default.find({
                $and: [
                    { users: { $elemMatch: { $eq: userId } } },
                    { users: { $elemMatch: { $eq: receiver } } },
                ],
            })
                .populate("users", "-password")
                .populate("latestMessage");
            isChat = await userModel_1.default.populate(isChat, {
                path: "latestMessage.sender",
                select: "firstName email",
            });
            if (isChat.length > 0) {
                return isChat[0];
            }
            else {
                let chatData = {
                    chatName: "sender",
                    creator: userId,
                    users: [userId, receiver],
                };
                try {
                    const createdChat = await chatModel_1.default.create(chatData);
                    const FullChat = await chatModel_1.default.findOne({ _id: createdChat._id }).populate("users", "-password");
                    return FullChat;
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    const fetchChats = async (userId) => {
        try {
            const results = await chatModel_1.default.find({
                users: { $elemMatch: { $eq: userId } },
            }).populate('users', '-password')
                .populate('latestMessage')
                .sort({ updatedAt: -1 });
            const typedResults = results;
            const fetchedChats = await userModel_1.default.populate(typedResults, {
                path: 'latestMessage.sender',
                select: 'firstName, email'
            });
            return fetchedChats;
        }
        catch (error) {
            console.log(error);
        }
    };
    const messageSent = async (sender, content, chatId) => {
        let newMessage = {
            sender: sender,
            content: content,
            chat: chatId
        };
        try {
            let message = await MessageModel_1.default.create(newMessage);
            message = await message.populate('sender', 'firstName');
            message = await message.populate('chat');
            message = await userModel_1.default.populate(message, {
                path: 'chat.users',
                select: 'firstName lastName'
            });
            const saved = await chatModel_1.default.findByIdAndUpdate(chatId, {
                latestMessage: message
            });
            return message;
        }
        catch (error) {
            console.log(error);
        }
    };
    const getAllMessage = async (chatId) => {
        try {
            const messages = await MessageModel_1.default.find({ chat: chatId })
                .populate('sender', 'firstName lastName')
                .populate('chat');
            return messages;
        }
        catch (error) {
            console.log(error);
        }
    };
    return {
        chatAccess,
        fetchChats,
        messageSent,
        getAllMessage
    };
};
exports.messageRepositoryMongoDb = messageRepositoryMongoDb;
