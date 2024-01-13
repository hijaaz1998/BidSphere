import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/user/Header/Navbar';
import Sidebar from "../../components/user/Sidebar/Sidebar";
import Posts from "../../components/user/Posts/Posts";
import AddPost from "../../components/user/AddPost/AddPost";
import Feeds from "../../components/user/Feeds/Feeds";
import UserSuggestions from "../../components/user/Feeds/UserSuggestion";

const Home: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>('feeds');
  const navigate = useNavigate();

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'feeds':
        return <Feeds />;
      case 'addPost':
        return <AddPost />;
      case 'myPost':
        return <Posts />;
      default:
        return null;
    }
  };

  const handleButtonClick = (component: string) => {
    setSelectedComponent(component);
  };

  const handleLogout = async () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <div className="flex h-full bg-black">
      {/* Fixed Navbar */}
      <Navbar />
      <button onClick={handleLogout}>Logout</button>
      <div className="flex flex-1">
        {/* Fixed Sidebar */}
        <Sidebar onButtonClick={handleButtonClick} />
        <div className="flex-1 flex flex-col">
          <div className="flex-none">
            {/* Placeholder for spacing (if needed) */}
          </div>
          <div className="flex-1 flex">
            <div className="flex-none">
              {/* Fixed Sidebar */}
              <Sidebar onButtonClick={handleButtonClick} />
            </div>
            <div className="flex-1 flex items-center justify-center">
              {/* Render Selected Component */}
              {renderSelectedComponent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
