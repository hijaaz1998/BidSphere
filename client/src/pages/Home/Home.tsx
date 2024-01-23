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
        return <AddPost setSelectedComponent={setSelectedComponent} />;
      case 'myPost':
        return <Posts />;
      default:
        return null;
    }
  };

  const handleButtonClick = (component: string) => {
    setSelectedComponent(component);
  };

  return (
    <>
      <div className=" top-0 w-full bg-gray-800 text-white p-4 text-center">
        <Navbar />
      </div>

      <div className="fixed left-0 top-14 h-full bg-gray-800 w-64 text-white">
        <Sidebar onButtonClick={handleButtonClick} />
      </div>

      <div className="ml-64 px-4 mt-10 flex">
        <div className="w-3/4 pr-4"> 
          {renderSelectedComponent()}
        </div>
        <div className="w-80 bg-white fixed right-0  overflow-y-hidden flex flex-col items-center "> 
        <UserSuggestions _id={""} userImage={""} firstName={""} lastName={""} />
        </div>
      </div>
      
    </>
    
  );
};

export default Home;
