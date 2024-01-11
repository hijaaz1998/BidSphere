import {useEffect, useState} from 'react'
import userImage from '../assets/User Avatar Vector Design Images, User Vector Avatar, Human Clipart, Female User, Icon PNG Image For Free Download.jpg'

interface UserData {
    firstName: string;
    lastName: string;
  }

const Sidebar = () => {

    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const data = localStorage.getItem('userData');
        if(data){
        const parsed = JSON.parse(data);
        setUserData(parsed)
        }
    },[])

  return (
    <div className="flex fixed top-20 h-screen bg-gray-400">
        {/* Sidebar */}
        <div className="w-64 bg-gray-400 shadow-md">
            {/* User Profile Card */}
            <div className="flex flex-col items-center justify-center p-4 rounded-lg mx-5 my-3 bg-white h-64">
            {/* Profile Image */}
            <div className="mb-4">
                <img src={userImage} alt="Profile Image" className="w-16 h-16 object-cover rounded-full" />
            </div>
            {/* User Info */}
            <div className="text-center">
                <h2 className="text-lg font-semibold">{`${userData?.firstName} ${userData?.lastName}`}</h2>
                <p className="text-gray-600">Followers: 500</p>
                <p className="text-gray-600">Following: 200</p>
                {/* Edit Profile Button */}
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full mt-2">Edit Profile</button>
            </div>
            </div>

            {/* Navigation Links */}
            <div className="h- text-center bg-white mx-5 rounded-lg overflow-y-auto">
                <a href="#" className="block p-2 text-white bg-black rounded-xl mx-10 my-3">
                    My Posts
                </a>
                <a href="#" className="block p-2 text-white bg-black rounded-xl mx-10 my-3">
                    Add Post
                </a>
                <a href="#" className="block p-2 text-white bg-black rounded-xl mx-10 my-3">
                    Notifications
                </a>
                <a href="#" className="block p-2 text-white bg-black rounded-xl mx-10 my-3">
                    Messages
                </a>
                <a href="#" className="block p-2 text-white bg-black rounded-xl mx-10 my-3">
                    My Bids
                </a>
                <a href="#" className="block p-2 text-white bg-black rounded-xl mx-10 my-3">
                    My Listings
                </a>
                <a href="#" className="block p-2 text-white bg-black rounded-xl mx-10 my-3">
                    Favorites
                </a>
            </div>
        </div>
    </div>

  )
}

export default Sidebar