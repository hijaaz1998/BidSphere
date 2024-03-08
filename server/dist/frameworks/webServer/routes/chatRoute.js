"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = __importDefault(require("../../../adapters/Chats/chatController"));
const jwtAuth_1 = __importDefault(require("../../../utils/middleware/jwtAuth"));
const messageDbRepository_1 = require("../../../application/interfaces/messageDbRepository");
const messageRepositoryMongoDb_1 = require("../../databse/repositories/messageRepositoryMongoDb");
const chatRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, chatController_1.default)(messageDbRepository_1.messageDbRepository, messageRepositoryMongoDb_1.messageRepositoryMongoDb);
    router.post('/chat/:reciever', jwtAuth_1.default, controller.accessChats);
    router.get('/chat', jwtAuth_1.default, controller.getChats);
    router.post('/sentMessage', jwtAuth_1.default, controller.sendMessage);
    router.get('/fetchMessages/:chatId', jwtAuth_1.default, controller.fetchMessages);
    return router;
};
exports.default = chatRouter;
