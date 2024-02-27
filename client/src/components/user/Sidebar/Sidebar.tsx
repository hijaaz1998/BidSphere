import { useEffect, useState } from "react";
import userImage from "../assets/User Avatar Vector Design Images, User Vector Avatar, Human Clipart, Female User, Icon PNG Image For Free Download.jpg";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import { RiListIndefinite } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa";
import { GrFavorite } from "react-icons/gr";
import { FaHome } from "react-icons/fa";

interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
}

interface SidebarProps {
  onButtonClick: (component: string) => void;
  notifications: any[]
}

const Sidebar: React.FC<SidebarProps> = ({ onButtonClick, notifications }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  useEffect(() => {

  },[notifications])
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <div className="hidden md:block w-64 h-full shadow-md mx-0 ml-4">
        <div>
          <div className="flex flex-col items-center p-4 rounded-lg mx-5 my-3 bg-black h-56 mt-5 drop-shadow-2xl overflow-hidden shadow-lg border-2 border-slate-800">
            <div className="mb-4">
              <img
                src={userImage}
                alt="Profile Image"
                className="w-20 h-20 object-cover rounded-full"
              />
            </div>
            <div className="text-center">
              <h2 className="text-sm text-white font-semibold">
                {userData?.firstName} {userData?.lastName}
              </h2>
              <button className="text-sm text-indigo-500 shadow-lg border-2 border-slate-800 rounded-lg px-5 py-2 mt-4 hover:bg-indigo-500 hover:text-white">
                <Link to={`/profile/${userData?._id}`}>Profile</Link>
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className=" text-center mx-5 rounded-lg overflow-y-auto drop-shadow-2xl overflow-hidden shadow-lg border-2 border-slate-800">
            <span
              onClick={() => onButtonClick("feeds")}
              className="block p-2 hover:cursor-pointer text-indigo-500 bg-black rounded-xl mx-10 my-3  drop-shadow-2xl overflow-hidden shadow-lg border-2 border-slate-800 hover:bg-indigo-500 hover:text-white"
            >
              Feeds
            </span>
            <span
              onClick={() => onButtonClick("addPost")}
              className="block p-2 hover:cursor-pointer text-indigo-500 bg-black rounded-xl mx-10 my-3 drop-shadow-2xl overflow-hidden shadow-lg border-2 border-slate-800 hover:bg-indigo-500 hover:text-white"
            >
              Add Post
            </span>
            <span className="block relative mx-10 my-3">
              {notifications.filter(notification => !notification.isRead).length > 0 && (
                <span className="absolute top-0 left-0 h-6 w-6 bg-red-500 rounded-full z-50">
                  {notifications.filter(notification => !notification.isRead).length}
                </span>
              )}
              <span
                onClick={() => onButtonClick("notifications")}
                className="block p-2 hover:cursor-pointer text-indigo-500 bg-black rounded-xl drop-shadow-2xl overflow-hidden shadow-lg border-2 border-slate-800 hover:bg-indigo-500 hover:text-white"
              >
                Notifications
              </span>
            </span>

            <span
              onClick={() => onButtonClick("messages")}
              className="block p-2 hover:cursor-pointer text-indigo-500 bg-black rounded-xl mx-10 my-3  drop-shadow-2xl overflow-hidden shadow-lg border-2 border-slate-800 hover:bg-indigo-500 hover:text-white"
            >
              Messages
            </span>
            <span
              onClick={() => onButtonClick("myBids")}
              className="block p-2 hover:cursor-pointer text-indigo-500 bg-black rounded-xl mx-10 my-3  drop-shadow-2xl overflow-hidden shadow-lg border-2 border-slate-800 hover:bg-indigo-500 hover:text-white"
            >
              My Bids
            </span>
            <span
              onClick={() => onButtonClick("myListings")}
              className="block p-2 hover:cursor-pointer text-indigo-500 bg-black rounded-xl mx-10 my-3 drop-shadow-2xl overflow-hidden shadow-lg border-2 border-slate-800 hover:bg-indigo-500 hover:text-white"
            >
              Listings
            </span>
            <span
              onClick={() => onButtonClick("favorites")}
              className="block p-2 hover:cursor-pointer text-indigo-500 bg-black rounded-xl mx-10 my-3  drop-shadow-2xl overflow-hidden shadow-lg border-2 border-slate-800 hover:bg-indigo-500 hover:text-white"
            >
              Favorites
            </span>
          </div>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden absolute top-4 right-4">
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
          >
            {showSidebar ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="w-14 block md:hidden mt-16 px-2">
        <Link to={`/profile/${userData?._id}`}><img src={userImage} alt="" className="rounded-full w-12 cursor-pointer" /></Link>
        {FaHome && <FaHome onClick={() => onButtonClick("feeds")} className="w-10 my-8 rounded-sm border border-slate-800 px-1 cursor-pointer"/>}
        {IoIosAdd && <IoIosAdd onClick={() => onButtonClick("addPost")} className="w-10 my-8 rounded-sm border border-slate-800 px-1 cursor-pointer"/>}
        {IoIosNotifications && <IoIosNotifications className="w-10 my-8 rounded-sm border border-slate-800 px-1 cursor-pointer" />}
        {FiMessageSquare && <FiMessageSquare onClick={() => onButtonClick("messages")} className="w-10 my-8 rounded-sm border border-slate-800 px-1 cursor-pointer" />}
        {RiListIndefinite && <RiListIndefinite onClick={() => onButtonClick("myBids")} className="w-10 my-8 rounded-sm border border-slate-800 px-1 cursor-pointer" />}
        {FaClipboardList && <FaClipboardList onClick={() => onButtonClick("myListings")} className="w-10 my-8 rounded-sm border border-slate-800 px-1 cursor-pointer" />}
        {GrFavorite && <GrFavorite onClick={() => onButtonClick("favorites")} className="w-10 my-8 rounded-sm border border-slate-800 px-1 cursor-pointer" />}
      </div>
    </>
  );
};

export default Sidebar;
