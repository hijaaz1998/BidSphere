import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/user/Header/Navbar';
import Sidebar from "../../components/user/Sidebar/Sidebar";
import Posts from "../../components/user/Posts/Posts";
import AddPost from "../../components/user/AddPost/AddPost";
import Feeds from "../../components/user/Feeds/Feeds";
import UserSuggestions from "../../components/user/Feeds/UserSuggestion";
import Messages from "../Messages/Messages";
import MyListings from "../../components/user/Listing/MyListings";
import Listings from "../../components/user/Listing/Listings";
import Favorites from "../../components/user/Favorites/Favorites";
import MyBids from "../../components/user/MyBids/MyBids";
import axiosInstance from "../../axiosEndPoints/userAxios";

const Home: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>('feeds');
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  
  const toggleSidebar = () => {
    setSelectedComponent('sidebar');
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      // Hide sidebar on small screens
      setIsSidebarVisible(window.innerWidth > 768); // Adjust this breakpoint as needed
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  useEffect(() => {
    const checkNotification = async () => {
      try {
        const response = await axiosInstance.get('/auction/notification')      
      } catch (error) {
        console.log("noti err",error);
      }
    }
    checkNotification();
  },[])

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'feeds':
        return (
          <div className={`flex w-full`}>
            <div className="w-full pr-4">
              <Feeds />
            </div>
            {isSidebarVisible && (
              <div className="w-1/4 flex flex-col items-center fixed top-14 right-0">
                <UserSuggestions _id={""} userImage={""} firstName={""} lastName={""} />
              </div>
            )}
          </div>
        );
      case 'addPost':
        return <AddPost setSelectedComponent={setSelectedComponent} />;
      case 'myPost':
        return <Posts />;
      case 'myListings':
        return <MyListings />;
      case 'messages':
        return <Messages />;
      case 'favorites':
        return <Favorites />
      case 'myBids':
        return <MyBids />
      case 'sidebar':
        return (
          <div className={`fixed left-0 top-14 h-full bg-black w-64 text-white md:block`}>
            <Sidebar onButtonClick={handleButtonClick} />
          </div>
        );
      default:
        return null;
    }
  };

  const handleButtonClick = (component: string) => {
    setSelectedComponent(component);
  };

  return (
    <>
      <div className="h-full bg-black">
        <div className=" top-0 w-full bg-black text-white p-4 text-center">
          <Navbar />
        </div>

        <div className={`fixed left-0 top-14 h-full bg-black w-64 text-white ${isSidebarVisible ? 'md:block' : 'hidden'}`}>
          <Sidebar onButtonClick={handleButtonClick} />
        </div>

        <button onClick={toggleSidebar} className={`md:hidden absolute top-52 left-4 bg-green-400 text-white focus:outline-none ${isSidebarVisible ? 'hidden' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        <div className={`ml-0 px-4 mt-11 flex bg-black h-full ${isSidebarVisible ? 'md:ml-64' : ''}`}>
          {renderSelectedComponent()}
        </div>
      </div>
    </> 
  );
};

export default Home;
