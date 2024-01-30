import React, { useEffect, useState } from 'react'
import userImage from '../assets/User Avatar Vector Design Images, User Vector Avatar, Human Clipart, Female User, Icon PNG Image For Free Download.jpg'
import axiosInstance from '../../../axiosEndPoints/userAxios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import UserRootState from '../../../app/rootState/userRootState';

interface UserData {
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
  }
}
interface RightSideUserProps {
  userData: UserData; // Add this prop to receive user data
}

const RightSideUser: React.FC<RightSideUserProps> = ({ userData }) => {  

  const [following, setFollowing] = useState(true)
  const [data, setData] = useState<UserData>(userData)
  const logedUser = useSelector((state: UserRootState) => state.user);

  console.log("userDataassssssssssss", userData);
  console.log("Dataassssssssssss", data);

  const isFollowing = userData?.followers?.includes(logedUser?.user?._id) 
  console.log("isfolloe", isFollowing);
  
  
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
  },[]);

  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-lg mx-5 my-3 bg-white h-64 mt-5">
        <div className="mb-4">
            <img src={userImage} alt="Profile Image" className="w-16 h-16 object-cover rounded-full" />
        </div>
        <div className="text-center">
            <h2 className="text-lg text-black font-semibold">{userData?.firstName} {userData?.lastName}</h2>
            {/* <p className="text-gray-600">Followers: {userData?.followers?.count}</p>
            <p className="text-gray-600">Following: {userData?.following?.count}</p> */}
            {following ? (
              <button
                onClick={() => handleUnfollow(userData?._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-full mt-2"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => handleFollow(userData._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-full mt-2"
              >
                Follow
              </button>
            )}
        </div>
    </div>
  )
}

export default RightSideUser