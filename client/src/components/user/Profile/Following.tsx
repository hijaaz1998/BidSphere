import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosEndPoints/userAxios';
import image from '../assets/User Avatar Vector Design Images, User Vector Avatar, Human Clipart, Female User, Icon PNG Image For Free Download.jpg'
import { Params, useNavigate } from 'react-router-dom';

interface FollowingUser {
  id: number;
  username: string;
  image: string;
}

interface UserIdProps {
  userId: Readonly<Params<string>>
}

interface FollowingProps {
  following: FollowingUser[];
}

const Following: React.FC<any> = ({userId, setActiveTab}) => {
  
  const [following, setFollowing] = useState<any[]>([])

  const navigate = useNavigate();

  const fetchFollowing = async () => {
    
    const response = await axiosInstance.get(`/user/getFollowing/${userId}`)

    setFollowing(response.data.following)

  };

  const handleCHange = (followingId: string) => {
    setActiveTab('posts');
    navigate(`/profile/${followingId}`)
  }

  useEffect(() => {
    fetchFollowing();
  },[userId])

  return (
    <div>
      {following.map((user) => (
        <div key={user.id} className="flex items-center bg-black p-2 rounded-md mb-2">
          <img src={image} alt='profile' className="w-8 h-8 object-cover rounded-full mr-2" />
          <span onClick={() => handleCHange(user._id)}
           className='text-white text-sm ml-3 hover:underline hover:cursor-pointer'>
            {user.firstName} {user.lastName}</span>
          <button className="ml-auto   px-2 py-1 rounded text-indigo-500 cursor-pointer hover:bg-indigo-500 hover:text-white">Unfollow</button>
        </div>
      ))}
    </div>
  );
};

export default Following;
