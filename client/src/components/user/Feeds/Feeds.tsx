// Feeds.tsx

import React, { useEffect, useState } from "react";
import userImage from "../assets/User Avatar Vector Design Images, User Vector Avatar, Human Clipart, Female User, Icon PNG Image For Free Download.jpg"; // replace with actual path
import axiosInstance from "../../../axiosEndPoints/userAxios";
import { Link } from "react-router-dom";
import { TiThumbsUp, TiMessage } from 'react-icons/ti';

const Feeds: React.FC = () => {
  const [feedsData, setFeedsData] = useState<any[]>([]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");

  const fetchData = async () => {
    const response = await axiosInstance.get(`/product/get_all_posts`);
    setFeedsData(response.data.posts);
  };

  const handleLikeClick = async (postId: string) => {
    const res = await axiosInstance.patch(`/product/like/${postId}`);
    const updatedLikes = res.data.updated.likes;
    setFeedsData((prevFeedsData) =>
      prevFeedsData.map((data) =>
        data._id === postId ? { ...data, likes: updatedLikes } : data
      )
    );
  };

  const openCommentModal = (post: any) => {
    setSelectedPost(post);
    axiosInstance.get(`product/comments/${post._id}`).then((response) => {
      setComments(response.data.comments);
      setShowCommentModal(true);
    });
  };

  const closeCommentModal = () => {
    setSelectedPost(null);
    setComments([]);
    setShowCommentModal(false);
    setNewComment('');
  };

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`product/comments/${selectedPost?._id}`);
      console.log("comments",response.data.comments);
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const addComment = async () => {
    try {
      await axiosInstance.post(`product/addComment/${selectedPost?._id}`, { comment: newComment }).then((response) => {
        console.log("commented",response.data);
        
      });
      setNewComment("");
      fetchComments(); // Fetch updated comments after adding a new comment
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Feeds Section */}
      <div className="flex-1 overflow-hidden">
        <div className="px-6 mt-20">
          <div className="bg-white">
            {feedsData.length > 0 ? (
              feedsData.map((data, index) => (
                <div
                  key={index}
                  className="max-w-xl mx-auto bg-white rounded-md overflow-hidden shadow-lg my-4 mt-14"
                >
                  <div className="flex flex-col p-4">
                    <div className="flex items-center">
                      <img
                        src={userImage}
                        alt="User Profile"
                        className="w-12 h-12 object-cover rounded-full"
                      />
                      <div className="ml-4">
                        <button>
                          <h2 className="text-lg font-semibold">
                            {data?.userId?.firstName} {data?.userId?.lastName}
                          </h2>
                        </button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h2 className="text-xl font-semibold">
                        {data.productName}
                      </h2>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Link to={`/postDetails/${data?._id}`}>
                      <img src={data.image} alt="Post" className="fixed-size-image" />
                    </Link>
                  </div>
                  <div className="flex justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <div
                        className="flex items-center space-x-2"
                        onClick={() => handleLikeClick(data?._id)}
                      >
                        <TiThumbsUp
                          className={`h-6 w-6 ${
                            data.likes ? "text-green-500 hover:cursor-pointer " : "text-gray-500 hover:cursor-pointer"
                          }`}
                        />
                        {data?.likes && (
                          <span className="text-gray-600">{data.likes.length}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <TiMessage
                          className="h-6 w-6 text-indigo-500 hover:cursor-pointer"
                          onClick={() => openCommentModal(data)}
                        />
                        <span className="text-gray-600"></span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-600">
                  Follow someone to get started. or Add a post
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comment Modal */}
      {showCommentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-1/2 mx-auto mt-20 p-4 rounded">
            <div className="flex justify-end">
              <button className="text-3xl cursor-pointer" onClick={closeCommentModal}>
                &times;
              </button>
            </div>
            <h1 className="text-2xl font-bold mb-4">Comments</h1>
            {comments && comments.length > 0 ? (
              <ul>
                {comments.map((comment, index) => (
                  <li key={index}>
                    <div className="flex items-center">
                      <img
                        src={comment?.user?.profileImage || userImage}
                        alt="User Profile"
                        className="w-8 h-8 object-cover rounded-full mr-2"
                      />
                      <p className="font-semibold">{comment.user?.firstName} {comment.user?.lastName}</p>
                    </div>
                    <p>{comment?.commentText}</p> {/* Assuming the comment text is stored in 'comment' field */}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No comments available.</p>
            )}
            <div className="mt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full h-16 border rounded p-2"
                placeholder="Add a comment..."
              ></textarea>
              <button
                onClick={addComment}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Feeds;
