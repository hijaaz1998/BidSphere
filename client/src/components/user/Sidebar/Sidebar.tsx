import {useEffect, useState} from 'react'
import userImage from '../assets/User Avatar Vector Design Images, User Vector Avatar, Human Clipart, Female User, Icon PNG Image For Free Download.jpg'
import { useSelector } from 'react-redux';

interface UserData {
    firstName: string;
    lastName: string;
  }

  interface SidebarProps {
    onButtonClick: (component: string) => void;
  }

const Sidebar: React.FC<SidebarProps> = ({onButtonClick}) => {

    const { firstName, lastName } = useSelector((state: any) => state.user);
    console.log("loggging", firstName, lastName);
    

    const [userData, setUserData] = useState<UserData  | null>(null);

    useEffect(() => {
        const data = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null;
        console.log("dataaaaaaa",data);
        
        if(data){
        setUserData(data)
        } 
    },[])

    console.log("userDataaaa",userData?.firstName);
    
    

  return (

        <div className="w-64 bg-gray-800 h-full shadow-md mx-0 m-0">
            <div className="flex flex-col items-center justify-center p-4 rounded-lg mx-5 my-3 bg-white h-64 mt-5">
                <div className="mb-4">
                    <img src={userImage} alt="Profile Image" className="w-16 h-16 object-cover rounded-full" />
                </div>
                <div className="text-center">
                    <h2 className="text-lg text-black font-semibold">{userData?.firstName} {userData?.lastName}</h2>
                    {/* <p className="text-gray-600">Followers: {userData?.followers?.count}</p>
                    <p className="text-gray-600">Following: {userData?.following?.count}</p> */}
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-full mt-2">Edit Profile</button>
                </div>
            </div>

            {/* Navigation Links */}
            <div className=" text-center bg-white mx-5 rounded-lg overflow-y-auto">
                <span onClick={() => onButtonClick('myPost')} className="block p-2 hover:cursor-pointer text-white bg-black rounded-xl mx-10 my-3">
                    My Posts
                </span>
                <span onClick={() => onButtonClick('addPost')} className="block p-2 hover:cursor-pointer text-white bg-black rounded-xl mx-10 my-3">
                    Add Post
                </span>
                <a  className="block p-2 text-white bg-black rounded-xl mx-10 my-3">
                    Notifications
                </a>
                <a  className="block p-2 text-white bg-black rounded-xl mx-10 my-3">
                    Messages
                </a>
                <a  className="block p-2 text-white bg-black rounded-xl mx-10 my-3">
                    My Bids
                </a>
                <a  className="block p-2 text-white bg-black rounded-xl mx-10 my-3">
                    My Listings
                </a>
                <a  className="block p-2 text-white bg-black rounded-xl mx-10 my-3">
                    Favorites
                </a>
            </div>
        </div>


  )
}

export default Sidebar




