import React, { useEffect, useState } from 'react'
import userImage from '../assets/User Avatar Vector Design Images, User Vector Avatar, Human Clipart, Female User, Icon PNG Image For Free Download.jpg'
import axiosInstance from '../../../axiosEndPoints/userAxios';
import { toast } from 'react-toastify';
// import { useSelector } from 'react-redux';
// import UserRootState from '../../../app/rootState/userRootState';

interface UserData {
  
    _id: string;
    firstName: string;
    lastName: string;
    
  
  // followers: any
  // firstName: string;
  // lastName: string;
  // _id: string;
}
interface RightSideUserProps {
  userData: UserData; // Add this prop to receive user data
}

const RightSideUser: React.FC<RightSideUserProps> = ({ userData }) => {  

  const [following, setFollowing] = useState(true)
  const [data, setData] = useState<UserData>(userData)
  // const logedUser = useSelector((state: UserRootState) => state.user);

  // const isFollowing = userData?.followers?.includes(logedUser?.user?._id)
  
  const handleUnfollow = async (userId: string) => {
    const response = await axiosInstance.patch(`/user/unfollow/${userId}`)
    setData(response.data.isUnFollowed)
    setFollowing(false)
    toast.success("Unfollowed Successfully");
    
  }

  const handleFollow = async (userId: string) => {
    const response = await axiosInstance.patch(`/user/follow/${userId}`)
    setFollowing(true);
    setData(response.data.isFollowed)
    toast.success('Followed Successfully');
    
  }

  useEffect(() => {
    setData(userData);
  },[data]);

  return (
    <div className="flex flex-col items-center justify-center bg-black p-6 rounded-lg mx-5 my-3 h-64 mt-4 border-2 border-slate-800 w-52">
        <div className="mb-4">
            <img src={userImage} alt="Profile Image" className="w-20 h-20 object-cover rounded-full" />
        </div>
        <div className="text-center">
            <h2 className="text-lg text-white font-semibold">{userData?.firstName} {userData?.lastName}</h2>
            {/* <p className="text-gray-600">Followers: {userData?.followers?.count}</p>
            <p className="text-gray-600">Following: {userData?.following?.count}</p> */}
            {following ? (
              <button
                onClick={() => handleUnfollow(userData?._id)}
                className="text-sm text-indigo-500 shadow-lg border-2 border-slate-800 rounded-lg px-5 py-2 mt-4 hover:bg-indigo-500 hover:text-white"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => handleFollow(userData._id)}
                className="text-sm text-indigo-500 shadow-lg border-2 border-slate-800 rounded-lg px-5 py-2 mt-4 hover:bg-indigo-500 hover:text-white"
              >
                Follow
              </button>
            )}
        </div>
    </div>
  )
}

export default RightSideUser