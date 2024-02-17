import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { MessageDbInterface } from '../../application/interfaces/messageDbRepository';
import { MessageRepositoryMongoDb } from '../../frameworks/databse/repositories/messageRepositoryMongoDb';
import { chatAccess, fetchChats, messageSent, fetchAllMessage } from '../../application/usecases/chats/chats';

interface AuthenticatedRequest extends Request { userId?: string; }

const chatController = (
    messageDbRepository: MessageDbInterface,
    messageDbRepositoryImpl: MessageRepositoryMongoDb
) => {

    const dbRepositoryMessage = messageDbRepository(messageDbRepositoryImpl())

    const accessChats = asyncHandler( async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.userId
        const reciever = req.params.reciever

        const chats = await chatAccess(dbRepositoryMessage, userId, reciever)

        res.json({
            chats
        })

    })

    const getChats = asyncHandler( async(req: AuthenticatedRequest, res: Response) => {
        const userId = req.userId

        const fetchedChats = await fetchChats(dbRepositoryMessage, userId)
        
        res.json({
            fetchedChats
        })
    })

    const sendMessage = asyncHandler( async(req: AuthenticatedRequest, res: Response) => {
        const sender = req.userId;
        const {content, chatId} = req.body

        const message = await messageSent(dbRepositoryMessage, sender, content, chatId)

        res.json({
            message
        })

    })

    const fetchMessages = asyncHandler ( async (req: AuthenticatedRequest, res: Response) => {
        try {

            const chatId = req.params.chatId
            const messages = await fetchAllMessage(dbRepositoryMessage, chatId);

            res.json({
                messages
            })
            
        } catch (error) {
            console.log(error);
            
        }
    })

    return{
        accessChats,
        getChats,
        sendMessage,
        fetchMessages
    }

}

export default chatController