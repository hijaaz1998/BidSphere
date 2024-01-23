import { useState } from "react";
import Navbar from "../../components/user/Header/Navbar"
import Sidebar from "../../components/user/Sidebar/Sidebar"
import Feeds from "../../components/user/Feeds/Feeds";
import AddPost from "../../components/user/AddPost/AddPost";
import Posts from "../../components/user/Posts/Posts";
import PostDetails from "../../components/user/Posts/PostDetails";
import RightSideComponent from "./RightSideComponent";

const PostDetailsPage = () => {

    const [selectedComponent, setSelectedComponent] = useState<string>('feeds');

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

      <div className="px-4 mt-9 flex ">
        <div className="w-3/4 pr-4 bg-slate-400"> 
          <PostDetails />
        </div>
            <div className="w-1/4 fixed right-0  overflow-y-hidden flex flex-col items-center mt-10 ">
                <RightSideComponent />
            </div>
      </div>
      
    </>
  )
}

export default PostDetailsPage