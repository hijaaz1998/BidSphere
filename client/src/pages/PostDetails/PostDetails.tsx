import { useState } from "react";
import {useParams} from 'react-router-dom'
import Navbar from "../../components/user/Header/Navbar"

import PostDetails from "../../components/user/Posts/PostDetails";
import RightSideComponent from "../../components/user/Posts/RightSideComponent";

const PostDetailsPage = () => {

  const {postId} = useParams();

  return (
    <>
      <div className=" top-0 w-full bg-gray-800 text-white p-4 text-center">
        <Navbar />
      </div>

      <div className="px-4 mt-9 flex ">
        <div className="w-3/4 pr-4"> 
          <PostDetails postId={postId} />
        </div>
        <div className="w-1/4 fixed right-0  overflow-y-hidden flex flex-col items-center ">
            <RightSideComponent postId={postId} />
        </div>
      </div>
      
    </>
  )
}

export default PostDetailsPage