// Post.jsx
import React from 'react';
import userImage from '../assets/User Avatar Vector Design Images, User Vector Avatar, Human Clipart, Female User, Icon PNG Image For Free Download.jpg';  // replace with actual path
import postImage from '../assets/painting-mountain-lake-with-mountain-background_188544-9126.avif';  // replace with actual path

const Post = () => {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-md overflow-hidden shadow-lg my-4 mt-24">
      {/* User Profile Section */}
      <div className="flex items-center p-4">
        <img src={userImage} alt="User Profile" className="w-12 h-12 object-cover rounded-full" />
        <div className="ml-4">
          <h2 className="text-lg font-semibold">Username</h2>
          {/* Other user information can go here */}
        </div>
      </div>

      {/* Post Image Section */}
      <img src={postImage} alt="Post" className="w-full h-full object-contain min-h-64" />

      {/* Post Actions Section */}
      <div className="flex justify-between p-4">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
          <span className="text-gray-600">Like</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="text-gray-600">Comment</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
