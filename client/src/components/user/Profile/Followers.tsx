import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosEndPoints/userAxios';
import image from '../assets/User Avatar Vector Design Images, User Vector Avatar, Human Clipart, Female User, Icon PNG Image For Free Download.jpg'

interface Follower {
  id: number;
  username: string;
  image: string;
}

interface FollowersProps {
  followers: Follower[];
}

const Followers: React.FC<FollowersProps> = () => {

  const [followers, setFollwers] = useState<any[]>([]);

  const fetchFollwers = async () => {
    const response = await axiosInstance.get('/user/getFollowers');
    setFollwers(response.data.followers)
  }
  console.log('followers',followers);
  
  useEffect(() => {
    fetchFollwers();
  },[])

  return (
    <div>
      {followers.map((follower) => (
        <div key={follower.id} className="flex items-center bg-black p-2 rounded-md mb-2">
          <img src={image} alt={follower.username} className="w-8 h-8 object-cover rounded-full mr-2" />
          <span className='text-white'>{follower.firstName} {follower.lastName}</span>
        </div>
      ))}
    </div>
  )
  
};

export default Followers;
