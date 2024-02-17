import { messageRepositoryMongoDb } from "../../../frameworks/databse/repositories/messageRepositoryMongoDb"
import { MessageDbInterface } from "../../interfaces/messageDbRepository"

export const chatAccess = async (
    messageRepository: ReturnType<MessageDbInterface>,
    userId: string | undefined,
    reciever: string
) => {
    const chat = await messageRepository.accessChats(userId, reciever)

    return chat
}

export const fetchChats = async (
    messageRepository: ReturnType<MessageDbInterface>,
    userId: string | undefined
) => {
    const chats = await messageRepository.getChats(userId)
    return chats
}

export const messageSent = async (
    messageRepository: ReturnType<MessageDbInterface>,
    sender: string | undefined,
    content: string,
    chatId: string
) => {
    const message = await messageRepository.sentMessage(sender, content, chatId);
    return message
}

export const fetchAllMessage = async (
    messageRepository: ReturnType<MessageDbInterface>,
    chatId: string
) => {
    const messages = await messageRepository.getAllMessages(chatId)

    return messages
}