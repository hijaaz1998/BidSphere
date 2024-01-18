// Feeds.tsx
import React, { useEffect, useState } from "react";
import userImage from "../assets/User Avatar Vector Design Images, User Vector Avatar, Human Clipart, Female User, Icon PNG Image For Free Download.jpg"; // replace with actual path
import axiosInstance from "../../../axiosEndPoints/userAxios";

const Feeds: React.FC = () => {
  // Assuming you have a state variable to store the data
  const [feedsData, setFeedsData] = useState<any[]>([]);

  // useEffect(() => {
  //   // Fetch data using axiosInstance or any other method
  //   // Update the state with the fetched data
  //   // Example:
  //   axiosInstance.get("/your-api-endpoint").then((response) => {
  //     setFeedsData(response.data);
  //   });
  // }, []); // Add any dependencies if needed

  // Dummy user suggestions data
  const userSuggestions: string[] = ["User1", "User2", "User3"];

  return (
    <div className="flex h-screen bg-gray-400">
      {/* Feeds Section */}
      <div className="flex-1 overflow-hidden">
        <div className=" px-6 mt-20">
          <div className="bg-gray-400 min-h-screen">
            {feedsData.length > 0 ? (
              feedsData.map((data, index) => (
                // Existing feed content
                <div
                  key={index}
                  className="max-w-xl mx-auto bg-white rounded-md overflow-hidden shadow-lg my-4 mt-14"
                >
                  {/* User Profile Section */}
                  <div className="flex items-center p-4">
                    <img
                      src={userImage}
                      alt="User Profile"
                      className="w-12 h-12 object-cover rounded-full"
                    />
                    <div className="ml-4">
                      <h2 className="text-lg font-semibold">Username</h2>
                      {/* Other user information can go here */}
                    </div>
                  </div>

                  {/* Post Image Section */}
                  <img
                    //   src={data.image} {/* Replace with the actual data property for the post image */}
                    alt="Post"
                    className="w-full h-full object-contain min-h-64"
                  />

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
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
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
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
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
