import express from 'express';
import chatController from '../../../adapters/Chats/chatController';
import jwtAuth from '../../../utils/middleware/jwtAuth';
import { messageDbRepository } from '../../../application/interfaces/messageDbRepository';
import { messageRepositoryMongoDb } from '../../databse/repositories/messageRepositoryMongoDb';

const chatRouter = () => {
    const router = express.Router();

    const controller = chatController(
        messageDbRepository,
        messageRepositoryMongoDb
    )

    router.post('/chat/:reciever', jwtAuth, controller.accessChats)
    router.get('/chat',jwtAuth, controller.getChats)
    router.post('/sentMessage', jwtAuth, controller.sendMessage)
    router.get('/fetchMessages/:chatId', jwtAuth, controller.fetchMessages)

    return router
}

export default chatRouter;