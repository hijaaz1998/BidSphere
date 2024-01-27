import React from 'react'
import userImage from '../assets/User Avatar Vector Design Images, User Vector Avatar, Human Clipart, Female User, Icon PNG Image For Free Download.jpg'

const RightSideUser = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-lg mx-5 my-3 bg-white h-64 mt-5">
        <div className="mb-4">
            <img src={userImage} alt="Profile Image" className="w-16 h-16 object-cover rounded-full" />
        </div>
        <div className="text-center">
            <h2 className="text-lg text-black font-semibold">hijaaz</h2>
            {/* <p className="text-gray-600">Followers: {userData?.followers?.count}</p>
            <p className="text-gray-600">Following: {userData?.following?.count}</p> */}
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full mt-2">Edit Profile</button>
        </div>
    </div>
  )
}

export default RightSideUser