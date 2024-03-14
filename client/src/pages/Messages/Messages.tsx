import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosEndPoints/userAxios";
import profileImage from "../../components/user/assets/User Avatar Vector Design Images, User Vector Avatar, Human Clipart, Female User, Icon PNG Image For Free Download.jpg";
import ScrollableFeed from "react-scrollable-feed";
import io from 'socket.io-client';
import { useNavigate } from "react-router-dom";

const ENDPOINT = import.meta.env.VITE_BASE_URL;
let selectedChatCompare: any;
const Messages = () => {
  const navigate = useNavigate();
  const socket = io(ENDPOINT);
  const userId = JSON.parse(localStorage.getItem("userId") || "null");

  const [hidden, setHidden] = useState(false)
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedChat, setselectedChat] = useState<any>(false);
  const [chats, setChats] = useState<any[]>([]);
  const [chatId, setChatId] = useState()
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const response = await axiosInstance.get(
        `/messages/fetchMessages/${selectedChat._id}`
      );

      setMessages(response.data.messages);
      
      socket.emit('joinChat',chatId)
    } catch (error) {
      //console.log(error);
    }
  };

  const handleSearch = async (e: any) => {
    setSearch(e.target.value);
    const response = await axiosInstance.get(`/user/search?search=${search}`);

    setSearchResults(response.data.results);
  };

  const getChats = async () => {
    const chats = await axiosInstance.get(`/messages/chat`);
    console.log("chats",chats.data.fetchedChats)
    setChats(chats.data.fetchedChats);
  };

  const accessChat = async (reciever: string) => {
    const chat = await axiosInstance.post(`/messages/chat/${reciever}`);
    console.log("chats",chat.data.chats)
    setHidden(true)
    setselectedChat(chat.data.chats);
    
    setChatId(chat.data.chats._id)
    setChats(chat.data.chat);
  };

  const typingHandler = (e: any) => {
    setNewMessage(e.target.value);
  }

  const startVideoCall = () => {
    navigate(`/videoChat`)
  }

  const sendMessage = async (e: any) => {
    e.preventDefault();

    setNewMessage("");
    const data = await axiosInstance.post(`/messages/sentMessage`, {
      content: newMessage,
      chatId: selectedChat._id,
    });

    socket.emit('new message', data.data.message)
    console.log("messages", messages)
    console.log("message", data.data.message)
    setMessages([...messages, data.data.message]);
  };

  
  useEffect(() => {
    socket.emit('setup',userId)
    socket.on('connection', () => setSocketConnected(true))
    console.log(socketConnected)
  },[socket])

  useEffect(() => {
    if(selectedChat){
      fetchMessages();
      selectedChatCompare = selectedChat
    }
  }, [selectedChat]);

  useEffect(() => {
    socket.on('message recieved',(newMessageRecieved: any) => {
      
      if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id){
        console.log("not setting");
        
      } else {
        console.log("messagesn1", newMessageRecieved)
        setMessages(prev => [...prev, newMessageRecieved])
      }

    })
  }, [])

  useEffect(() => {
    getChats();
  }, [selectedChat]);



  return (
    <div className="container h-full">
      <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
        <div className={`border-r border-gray-300 lg:col-span-1 ${hidden && "hidden"} `}>
          <div className="mx-3 my-3">
            <div className="relative text-gray-600">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-gray-300"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="search"
                className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                name="search"
                value={search}
                placeholder="Search User"
                onChange={(e) => handleSearch(e)}
              />
            </div>
          </div>
          <ul className="overflow-auto h-[32rem]">
            <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
            {search.length === 0
              ? chats?.map((chat, index) => (
                  <React.Fragment key={index}>
                    {chat?.users
                      ?.filter((user: any) => {
                        return user._id.toString() !== userId;
                      })
                      .map((user: any, userIndex: number) => (
                        <li key={userIndex}>
                          <a className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                            <img
                              className="object-cover w-10 h-10 rounded-full"
                              src={profileImage}
                              // alt={chat.username}
                            />
                            <div
                              className="w-full pb-2"
                              onClick={() => accessChat(user._id)}
                            >
                              <div className="flex justify-between">
                                <span className="block ml-2 font-semibold text-white">
                                  {user.firstName}
                                </span>
                              </div>
                            </div>
                          </a>
                        </li>
                      ))}
                  </React.Fragment>
                ))
              : searchResults?.map((result, index) => (
                  <li key={index}>
                    <a className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                      <img
                        className="object-cover w-10 h-10 rounded-full"
                        src={profileImage}
                        // alt={result.username}
                      />
                      <div
                        className="w-full pb-2"
                        onClick={() => accessChat(result._id)}
                      >
                        <div className="flex justify-between">
                          <span className="block ml-2 font-semibold text-gray-600">
                            {result.firstName}
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
          </ul>
        </div>
        <div className={`lg:col-span-2 lg:block ${!hidden && "hidden"}`}>
          {Object.keys(selectedChat).length >= 1 ? (
            <div className="w-full">
              <div className="relative flex items-center justify-between p-3 border-b border-gray-300">
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                  alt="username"
                />
                <span className="block ml-2 font-bold text-gray-600">
                  {selectedChat.users.find((user: { _id: any; }) => user._id !== userId)?.firstName}{" "}
                  {selectedChat.users.find((user: { _id: any; }) => user._id !== userId)?.lastName}
                </span>
                <p onClick={() => setHidden(false)} className="text-indigo-500 px-2 cursor-pointer border-2 border-slate-800">x</p>
              </div>
              <ScrollableFeed>
                <div className="relative w-full p-6 overflow-y-auto scrollbar-hidden h-[32rem]">
                  <ul className="space-y-2">
                    {messages?.map((message) => (
                      <React.Fragment key={message.id}>
                        {message.sender._id === userId ?
                        (
                          <li className="flex justify-end">
                            <div className="relative max-w-xl px-4 py-2 text-gray-100 bg-gray-700 rounded shadow">
                              <span className="block">{message.content}</span>
                            </div>
                          </li>
                        ) : (
                          <li className="flex justify-start">
                            <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                              <span className="block">{message.content}</span>
                            </div>
                          </li>
                        )}
                      </React.Fragment>
                    ))}
                  </ul>
                </div>
              </ScrollableFeed>
              <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                <input
                    onChange={(e) => typingHandler(e)}
                    type="text"
                    placeholder="Message"
                    className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                    name="message"
                    value={newMessage}
                />
                <button onClick={(e) => sendMessage(e)}>
                    <svg
                        className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                </button>
                <button onClick={startVideoCall}>
                    <svg
                        className="w-5 h-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path>
                        <path d="M15 3V7a2 2 0 002 2h4"></path>
                        <path d="M10 17L15 12 10 7"></path>
                    </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-xl text-gray-600">Select or search a chat to start messaging</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Messages;
