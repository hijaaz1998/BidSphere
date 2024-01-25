// Feeds.tsx
import React, { useEffect, useState } from "react";
import userImage from "../assets/User Avatar Vector Design Images, User Vector Avatar, Human Clipart, Female User, Icon PNG Image For Free Download.jpg"; // replace with actual path
import axiosInstance from "../../../axiosEndPoints/userAxios";
import { Link } from "react-router-dom";

const Feeds: React.FC = () => {

  const [feedsData, setFeedsData] = useState<any[]>([]);

  const fetchData = async () => {
    const response = await axiosInstance.get(`/product/get_all_posts`)
    console.log("response.data.posts",response.data.posts);
    
    setFeedsData(response.data.posts)
  }

  console.log("feedsData",feedsData);
  

  useEffect(() => {
    fetchData();
  },[])

  return (
    <div className="flex min-h-screen bg-white">
    {/* Feeds Section */}
    <div className="flex-1 overflow-hidden">
      <div className="px-6 mt-20">
        <div className="bg-white">
  
          {feedsData.length > 0 ? (
            feedsData.map((data, index) => (
              // Existing feed content
              <div
                key={index}
                className="max-w-xl mx-auto bg-white rounded-md overflow-hidden shadow-lg my-4 mt-14"
              >
                {/* User Profile Section */}
                <div className="flex flex-col p-4">
                  <div className="flex items-center">
                    <img
                      src={userImage}
                      alt="User Profile"
                      className="w-12 h-12 object-cover rounded-full"
                    />
                    <div className="ml-4">
                    <button>  <h2 className="text-lg font-semibold">
                        {data?.userId?.firstName} {data?.userId?.lastName}
                      </h2></button>
                      {/* Other user information can go here */}
                    </div>
                  </div>
                  {/* Post Name Section */}
                  <div className="mt-4">
                    <h2 className="text-xl font-semibold">
                      {data.productName}
                    </h2>
                  </div>
                </div>
  
                {/* Post Image Section */}
                <div className="flex justify-center">
                  <Link to={`/postDetails/${data?._id}`} >
                    <img src={data.image} alt="Post" className="fixed-size-image" />
                  </Link>
                </div>
  
                {/* Post Actions Section */}
                <div className="flex justify-between p-4">
                  <div className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
  
                    <span className="text-gray-600">Like</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-gray-600">Comment</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-600">Follow someone to get started. or Add a post</p>
            </div>
          )}
  
        </div>
      </div>
    </div>
  </div>
  
  

  );
};

export default Feeds;
