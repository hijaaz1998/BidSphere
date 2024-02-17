import mongoose from "mongoose";
import { MessageRepositoryMongoDb } from "../../frameworks/databse/repositories/messageRepositoryMongoDb";

export const messageDbRepository = (
    repository: ReturnType<MessageRepositoryMongoDb>
) => {
    const accessChats = async (
        userId: string | undefined,
        reciever: string
    ) => {
        return await repository.chatAccess(userId, reciever)
    }

    const getChats = async (userId: string | undefined) => {
        return await repository.fetchChats(userId)
    }

    const sentMessage = async(
        sender: string | undefined,
        content: string,
        chatId: string
    ) => {
        return await repository.messageSent(sender, content, chatId)
    }

    const getAllMessages = async (chatId: string) =>{
        return await repository.getAllMessage(chatId)
    }

    return {
        accessChats,
        getChats,
        sentMessage,
        getAllMessages
    }
}

export type MessageDbInterface = typeof messageDbRepository