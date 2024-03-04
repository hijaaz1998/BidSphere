import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const VideoChat = () => {
    const { chatId } = useParams();
    const [roomLink, setRoomLink] = useState('');
    const [value, setValue] = useState();
    const navigate = useNavigate();


    const generateRandomCode = () => {
        // Generate a random string of characters
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomCode = '';
        for (let i = 0; i < 8; i++) {
          randomCode += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return randomCode;
      };

      const handleJoinRoom = useCallback(() => {
        navigate(`/room/${roomLink}`)
      },[navigate, roomLink])

    const handleCreateRoom = () => {
        // Logic for creating a new room
        console.log("Creating new room");
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex space-x-4 mb-4">
                <input
                    type="text"
                    placeholder="Paste room link"
                    value={roomLink}
                    onChange={(e) => setRoomLink(e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-4 w-64"
                />
                <button onClick={handleJoinRoom} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Join Room</button>
            </div>
            <div>
                <button onClick={handleCreateRoom} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Create Room</button>
            </div>
        </div>
    );
};

export default VideoChat;
