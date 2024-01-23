import React, { useEffect, useState } from 'react';
import userImage from '../assets/User Avatar Vector Design Images, User Vector Avatar, Human Clipart, Female User, Icon PNG Image For Free Download.jpg'
import axiosInstance from '../../../axiosEndPoints/userAxios';

interface UserProfileProps {
  _id: string;
  userImage: string;
  firstName: string;
  lastName: string;
}

interface User {
  _id: string;
  userImage: string;
  firstName: string;
  lastName: string;
}

const UserProfile: React.FC<UserProfileProps> = () => {

  const [suggestions, setSuggestions] = useState<User[]>([])
  const [follow, setFollow] = useState<Boolean>(false)

  const fetchUserSuggestion = async () => {
    try {
      const data = await axiosInstance.get(`/user/get_suggestions`)
      const suggestions = data.data.suggestions
      setSuggestions(suggestions)
      
    } catch (error) {
      console.log(error);
      
    } 
  }

  useEffect(() => {
    fetchUserSuggestion();
  },[follow])

  const followUser = async (followed: string) => {
    
    const isFollowed = await axiosInstance.patch(`/user/follow/${followed}`)
    
    setFollow((prev) => !prev);
  }
  

  return (
    <>
      {suggestions.map((user) => (
        <div key={user._id} className=" flex items-center bg-white px-5 py-3 m-2 rounded-lg drop-shadow-xl mt-5">
          <img src={userImage} alt="Profile Image" className="w-12 h-12 object-cover rounded-full mr-4" />
          <div className="flex items-center flex-grow w-full"> 
            <h2 className="text-lg font-semibold mr-4" title='...'>{user.firstName} {user.lastName}</h2> 
            <button onClick={() => followUser(user._id)} className="px-4 py-2 rounded-full bg-blue-500 text-white ml-auto">
              Follow
            </button>
          </div>
        </div>
      ))}
    </>

  );
};

export default UserProfile;
