import React, { useState } from 'react';
import profile from '../assets/User Avatar Vector Design Images, User Vector Avatar, Human Clipart, Female User, Icon PNG Image For Free Download.jpg';
import image from '../assets/Old globe.jpg';
import Posts from '../Profile/Posts';
import Following from '../Profile/Following';
import Followers from '../Profile/Followers';

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

const ProfileComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'followers' | 'following'>('posts');

  // Dummy data (replace this with actual user data)
  const userProfile: UserProfile = {
    photo: 'path/to/profile-photo.jpg',
    name: 'John Doe',
    followersCount: 100,
    followingCount: 50,
    postsCount: 20,
    posts: [
      { id: 1, image: image, caption: 'Caption 1' },
      { id: 2, image: image, caption: 'Caption 2' },
      { id: 3, image: image, caption: 'Caption 3' },
    ], // Replace with actual posts data
    followers: [
      { id: 1, username: 'Follower 1', image: 'follower1.jpg' },
      { id: 2, username: 'Follower 2', image: 'follower2.jpg' },
      { id: 3, username: 'Follower 3', image: 'follower3.jpg' },
    ], // Replace with actual followers data
    following: [
      { id: 4, username: 'Following 1', image: 'following1.jpg' },
      { id: 5, username: 'Following 2', image: 'following2.jpg' },
      { id: 6, username: 'Following 3', image: 'following3.jpg' },
    ], // Replace with actual following data
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return <Posts posts={userProfile.posts} />;
      case 'followers':
        return <Followers followers={userProfile.followers} />;
      case 'following':
        return <Following following={userProfile.following} />;
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
            <h2 className='text-lg font-semibold text-white'>{userProfile.name}</h2>
            <div className="flex space-x-2 text-sm">
              <span className='text-white'>Followers: {userProfile.followersCount}</span>
              <span className='text-white'>Following: {userProfile.followingCount}</span>
              <span className='text-white'>Posts: {userProfile.postsCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Tabs */}
      <div className="flex justify-around mt-4 bg-black p-2 rounded-md border-2 border-slate-800 py-4">
        <button onClick={() => setActiveTab('posts')} className={`text-indigo-500 border-2 border-slate-800 px-3 py-2 rounded-md ${activeTab === 'posts' && 'bg-indigo-500 text-white'}`}>
          Posts
        </button>
        <button onClick={() => setActiveTab('followers')} className={`text-indigo-500 border-2 border-slate-800 px-3 py-2 rounded-md ${activeTab === 'followers' && 'bg-indigo-500 text-white'}`}>
          Followers
        </button>
        <button onClick={() => setActiveTab('following')} className={`text-indigo-500 border-2 border-slate-800 px-3 py-2 rounded-md ${activeTab === 'following' && 'bg-indigo-500 text-white'}`}>
          Following
        </button>
      </div>

      {/* Display content based on the active tab */}
      <div className="mt-4 bg-black max-h-72 overflow-y-auto">{renderContent()}</div>
    </div>
  );
};

export default ProfileComponent;
