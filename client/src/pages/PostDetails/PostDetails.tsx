import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "../../components/user/Header/Navbar";
import axiosInstance from "../../axiosEndPoints/userAxios";
import PostDetails from "../../components/user/Posts/PostDetails";
import RightSideComponent from "../../components/user/Posts/RightSideComponent";
import RightSideUser from "../../components/user/Posts/RightSideUser";
import { useSelector } from "react-redux";
import UserRootState from "../../app/rootState/userRootState";

interface PostData {
  _id: string;
  productName: string;
  image: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  createdOn: string;
  comments: any[];
  likes: any[];
  description?: string;
  isBlocked: boolean
}

const PostDetailsPage = () => {
  const { postId } = useParams();
  const logedUser = useSelector((state: UserRootState) => state.user);
  const [data, setData] = useState<PostData | null>(null);

  const fetchPostData = async () => {
    try {
      const response = await axiosInstance.get(`/product/postDetails/${postId}`);
      console.log("datass",response.data);
      
      setData(response.data);
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  };



  useEffect(() => {
    fetchPostData();
  }, []);

  return (
    <div className="h-screen bg-black">
      <div className="top-0 w-full text-white p-4 text-center">
        <Navbar />
      </div>

      <div className="px-4 mt-9 flex h-full">
        <div className="w-3/4 pr-4 ">
          {data && (
            <PostDetails
              postDetail={data}
              isOwnPost={logedUser?.user?._id === data?.userId?._id}
            />
          )}
        </div>

        <div className="w-1/4 fixed right-0 overflow-y-hidden flex flex-col items-center ">
          {data && (
            logedUser?.user?._id === data?.userId?._id ? (
              <RightSideComponent postId={postId} />
            ) : (
              <RightSideUser userData={data?.userId} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;
