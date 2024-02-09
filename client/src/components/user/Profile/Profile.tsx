import React, { useEffect, useState } from 'react';
import profile from '../assets/User Avatar Vector Design Images, User Vector Avatar, Human Clipart, Female User, Icon PNG Image For Free Download.jpg';
import image from '../assets/Old globe.jpg';
import Posts from '../Profile/Posts';
import Following from '../Profile/Following';
import Followers from '../Profile/Followers';
import { Params } from 'react-router';
import axiosInstance from '../../../axiosEndPoints/userAxios';

interface userIdProps {
  userId: Readonly<Params<string>>
}

interface UserProfile {
  photo: string;
  name: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  posts: Post[];
  followers: Follower[];
  following: FollowingUser[];
}

interface Post {
  id: number;
  image: string;
  caption: string;
}

interface Follower {
  id: number;
  username: string;
  image: string;
}

interface FollowingUser {
  id: number;
  username: string;
  image: string;
}

const ProfileComponent: React.FC<any> = ({ userId }) => {
  const [user, setUser ] = useState<any>();
  const [activeTab, setActiveTab] = useState<'posts' | 'followers' | 'following'>('posts');
  

  const fetchUserData = async () => {
    const response = await axiosInstance.get(`/user/getUserInfo/${userId}`);

    setUser(response.data.user)
    console.log("userINfo", response.data.user);
    
  }

  useEffect(() => {
    fetchUserData();
  },[userId])

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return <Posts userId={userId} />;
      case 'followers':
        return <Followers userId={userId} setActiveTab={setActiveTab} />;
      case 'following':
        return <Following userId={userId} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 h-fit mt-10">
      {/* Top Section */}
      <div className="bg-black p-4 rounded-md  border-2 border-slate-800">
        <div className="flex items-center justify-around">
          <div className="w-32 h-32 overflow-hidden rounded-full ">
            <img src={profile} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="ml-4">
            <h2 className='text-lg font-semibold text-white'>{user?.firstName} {user?.lastName}</h2>
            <div className="flex space-x-2 text-sm">
              <span className='text-white'>Followers: {user?.followers?.length}</span>
              <span className='text-white'>Following: {user?.following?.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Tabs */}
      <div className="flex justify-around mt-4 bg-black p-2  py-4">
        <button onClick={() => setActiveTab('posts')} className={`text-indigo-500 border-2 border-slate-800 px-20 py-2 rounded-md ${activeTab === 'posts' && 'bg-indigo-500 text-white'}`}>
          Posts
        </button>
        <button onClick={() => setActiveTab('followers')} className={`text-indigo-500 border-2 border-slate-800 px-20 py-2 rounded-md ${activeTab === 'followers' && 'bg-indigo-500 text-white'}`}>
          Followers
        </button>
        <button onClick={() => setActiveTab('following')} className={`text-indigo-500 border-2 border-slate-800 px-20 py-2 rounded-md ${activeTab === 'following' && 'bg-indigo-500 text-white'}`}>
          Following
        </button>
      </div>

      {/* Display content based on the active tab */}
      <div className="mt-4 bg-black max-h-72 overflow-y-auto">{renderContent()}</div>
    </div>
  );
};

export default ProfileComponent;
