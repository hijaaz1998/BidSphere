"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const chats_1 = require("../../application/usecases/chats/chats");
const chatController = (messageDbRepository, messageDbRepositoryImpl) => {
    const dbRepositoryMessage = messageDbRepository(messageDbRepositoryImpl());
    const accessChats = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const userId = req.userId;
            const reciever = req.params.reciever;
            const chats = await (0, chats_1.chatAccess)(dbRepositoryMessage, userId, reciever);
            console.log("chats", chats);
            res.json({
                chats
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const getChats = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const userId = req.userId;
            const fetchedChats = await (0, chats_1.fetchChats)(dbRepositoryMessage, userId);
            res.json({
                fetchedChats
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const sendMessage = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const sender = req.userId;
            const { content, chatId } = req.body;
            const message = await (0, chats_1.messageSent)(dbRepositoryMessage, sender, content, chatId);
            res.json({
                message
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const fetchMessages = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const chatId = req.params.chatId;
            console.log(chatId);
            const messages = await (0, chats_1.fetchAllMessage)(dbRepositoryMessage, chatId);
            res.json({
                messages
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    return {
        accessChats,
        getChats,
        sendMessage,
        fetchMessages
    };
};
exports.default = chatController;
