"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllMessage = exports.messageSent = exports.fetchChats = exports.chatAccess = void 0;
const chatAccess = async (messageRepository, userId, reciever) => {
    const chat = await messageRepository.accessChats(userId, reciever);
    return chat;
};
exports.chatAccess = chatAccess;
const fetchChats = async (messageRepository, userId) => {
    const chats = await messageRepository.getChats(userId);
    return chats;
};
exports.fetchChats = fetchChats;
const messageSent = async (messageRepository, sender, content, chatId) => {
    const message = await messageRepository.sentMessage(sender, content, chatId);
    return message;
};
exports.messageSent = messageSent;
const fetchAllMessage = async (messageRepository, chatId) => {
    const messages = await messageRepository.getAllMessages(chatId);
    return messages;
};
exports.fetchAllMessage = fetchAllMessage;
