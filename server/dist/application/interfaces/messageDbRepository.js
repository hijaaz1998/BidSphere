"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageDbRepository = void 0;
const messageDbRepository = (repository) => {
    const accessChats = async (userId, reciever) => {
        return await repository.chatAccess(userId, reciever);
    };
    const getChats = async (userId) => {
        return await repository.fetchChats(userId);
    };
    const sentMessage = async (sender, content, chatId) => {
        return await repository.messageSent(sender, content, chatId);
    };
    const getAllMessages = async (chatId) => {
        return await repository.getAllMessage(chatId);
    };
    return {
        accessChats,
        getChats,
        sentMessage,
        getAllMessages
    };
};
exports.messageDbRepository = messageDbRepository;
