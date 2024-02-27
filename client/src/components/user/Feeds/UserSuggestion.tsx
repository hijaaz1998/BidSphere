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
        <div key={user._id} className=" flex items-center bg-black px-5 py-3 rounded-lg  mt-5  overflow-hidden shadow-lg border-2 border-slate-800 mr-1">
          <img src={userImage} alt="Profile Image" className="w-11 h-11 object-cover rounded-full mr-4" />
          <div className="flex items-center flex-grow w-full"> 
            <div className='w-full min-w-32'>
               <h2 className="text-sm text-white font-semibold mr-4" title='...'>{user.firstName} {user.lastName}</h2> 
            </div>
            <button
              onClick={() => followUser(user._id)}
              className="px-4 py-2 rounded-full bg-black ml-auto shadow-lg border-2 border-slate-800
                hover:bg-indigo-500 hover:text-white text-indigo-500"
            >
              Follow
            </button> 
          </div>
        </div>
      ))}
    </>

  );
};

export default UserProfile;
