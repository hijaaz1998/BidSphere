import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Navbar from '../components/user/Header/Navbar'
import Sidebar from "./user/Sidebar/Sidebar";
// import axiosInstance from "../axiosEndPoints/userAxios"
import Posts from "./user/Posts/Posts";
import AddPost from "./user/AddPost/AddPost";

function Home() {

  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem('userData')
    localStorage.removeItem('userToken');
    navigate('/');
  }
  
  return (
    <>
      <div className="flex h-screen bg-black">
      <Navbar />
      <button onClick={handleLogout}>Logout</button>
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <AddPost />
          {/* Add other components/content here */}
          
        </div>
      </div>
      
    </div>
    
    </>
  )
}

export default Home