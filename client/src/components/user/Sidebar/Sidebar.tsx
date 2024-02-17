import {useEffect, useState} from 'react'
import userImage from '../assets/User Avatar Vector Design Images, User Vector Avatar, Human Clipart, Female User, Icon PNG Image For Free Download.jpg'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
interface UserData {
    _id: string;
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
        const data = localStorage.getItem('userData')
        
        if(data){
        setUserData(JSON.parse(data))
        } 
    },[])

    console.log("userDataaaa",userData?.firstName);
    
    

  return (

        <div className="w-64  h-full shadow-md mx-0 ml-4">
            <div className="flex flex-col items-center p-4 rounded-lg mx-5 my-3 bg-black h-56 mt-5 drop-shadow-2xl overflow-hidden shadow-lg border-2 border-slate-800">
                <div className="mb-4">
                    <img src={userImage} alt="Profile Image" className="w-20 h-20 object-cover rounded-full" />
                </div>
                <div className="text-center">
                    <h2 className="text-sm text-white font-semibold">{userData?.firstName} {userData?.lastName}</h2>
                    <button className='text-sm text-indigo-500 shadow-lg border-2 border-slate-800 rounded-lg px-5 py-2 mt-4 hover:bg-indigo-500 hover:text-white'>
                        <Link to={`/profile/${userData?._id}`}>Profile</Link>
                    </button>
                </div>
            </div>

            {/* Navigation Links */}
            <div className=" text-center mx-5 rounded-lg overflow-y-auto drop-shadow-2xl overflow-hidden shadow-lg border-2 border-slate-800">
                <span onClick={() => onButtonClick('feeds')} className="block p-2 hover:cursor-pointer text-indigo-500 bg-black rounded-xl mx-10 my-3  drop-shadow-2xl overflow-hidden shadow-lg border-2 border-slate-800 hover:bg-indigo-500 hover:text-white">
                    Feeds
                </span>
                <span onClick={() => onButtonClick('addPost')} className="block p-2 hover:cursor-pointer text-indigo-500 bg-black rounded-xl mx-10 my-3 drop-shadow-2xl overflow-hidden shadow-lg border-2 border-slate-800 hover:bg-indigo-500 hover:text-white">
                    Add Post
                </span>
                <span  className="block p-2 hover:cursor-pointer text-indigo-500 bg-black rounded-xl mx-10 my-3  drop-shadow-2xl overflow-hidden shadow-lg border-2 border-slate-800 hover:bg-indigo-500 hover:text-white">
                    Notifications
                </span>
                <span onClick={() => onButtonClick('messages')}  className="block p-2 hover:cursor-pointer text-indigo-500 bg-black rounded-xl mx-10 my-3  drop-shadow-2xl overflow-hidden shadow-lg border-2 border-slate-800 hover:bg-indigo-500 hover:text-white">
                    Messages
                </span>
                <span  className="block p-2 hover:cursor-pointer text-indigo-500 bg-black rounded-xl mx-10 my-3  drop-shadow-2xl overflow-hidden shadow-lg border-2 border-slate-800 hover:bg-indigo-500 hover:text-white">
                    My Bids
                </span>
                <span onClick={() => onButtonClick('myListings')} className="block p-2 hover:cursor-pointer text-indigo-500 bg-black rounded-xl mx-10 my-3 drop-shadow-2xl overflow-hidden shadow-lg border-2 border-slate-800 hover:bg-indigo-500 hover:text-white">
                    Listings
                </span>
                <span  className="block p-2 hover:cursor-pointer text-indigo-500 bg-black rounded-xl mx-10 my-3  drop-shadow-2xl overflow-hidden shadow-lg border-2 border-slate-800 hover:bg-indigo-500 hover:text-white">
                    Favorites
                </span>
            </div>
        </div>


  )
}

export default Sidebar




