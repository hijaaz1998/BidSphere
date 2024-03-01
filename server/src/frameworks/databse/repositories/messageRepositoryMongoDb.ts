import Chat from "../model/chatModel"; // Assuming ChatDocument is the type of a document in your Mongoose model
import mongoose, {} from "mongoose";
import User from "../model/userModel";
import { log } from "console";
import Message from "../model/MessageModel";

export const messageRepositoryMongoDb = () => {
  const chatAccess = async (userId: string | undefined, receiver: string) => {
    
    try {
      let isChat: any = await Chat.find({
        $and: [
          { users: { $elemMatch: { $eq: userId } } },
          { users: { $elemMatch: { $eq: receiver } } },
        ],
      })
        .populate("users", "-password")
        .populate("latestMessage");
  
      isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "firstName email",
      });
  
      if (isChat.length > 0) {      
        return isChat[0];
      } else {
        let chatData = {
          chatName: "sender",
          creator: userId,
          users: [userId, receiver],
        };
  
        try {
          const createdChat = await Chat.create(chatData);
  
          const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
            "users",
            "-password"
          );
          
          return FullChat;
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error)
    }
    
  };

  const fetchChats = async (userId: string | undefined) => {
    try {
        const results = await Chat.find({
            users: { $elemMatch: { $eq: userId } },
        }).populate('users', '-password')
        .populate('latestMessage')
        .sort({updatedAt: -1});

        const typedResults: Omit<any, never>[] = results as Omit<any, never>[];

        const fetchedChats = await User.populate(typedResults, {
            path: 'latestMessage.sender',
            select: 'firstName, email'
        });
        
        return fetchedChats

    } catch (error) {
        console.log(error);
    }
  };

  const messageSent = async (
    sender: string | undefined,
    content: string,
    chatId: string
  ) => {

    let newMessage = {
      sender: sender,
      content: content,
      chat: chatId
    }

    try {

      let message = await Message.create(newMessage)

      message = await message.populate('sender', 'firstName')
      message = await message.populate('chat')
      message = await User.populate(message, {
        path: 'chat.users',
        select: 'firstName lastName'
      })

      const saved = await Chat.findByIdAndUpdate(chatId,{
        latestMessage: message
      })      

      return message
      
    } catch (error) {
      console.log(error);
      
    }

  }

  const getAllMessage = async (chatId: string) => {
    try {

      const messages = await Message.find({chat: chatId})
        .populate('sender', 'firstName lastName')
        .populate('chat')
      
      return messages
      
    } catch (error) {
      console.log(error);
      
    }
  }

  return {
    chatAccess,
    fetchChats,
    messageSent,
    getAllMessage
  };
};

export type MessageRepositoryMongoDb = typeof messageRepositoryMongoDb;
