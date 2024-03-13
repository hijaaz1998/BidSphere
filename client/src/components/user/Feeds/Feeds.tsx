// Feeds.tsx

import React, { useEffect, useState } from "react";
import userImage from "../assets/User Avatar Vector Design Images, User Vector Avatar, Human Clipart, Female User, Icon PNG Image For Free Download.jpg"; // replace with actual path
import axiosInstance from "../../../axiosEndPoints/userAxios";
import { Link } from "react-router-dom";
import { TiThumbsUp, TiMessage } from "react-icons/ti";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";

const   Feeds: React.FC = () => {
  const [feedsData, setFeedsData] = useState<any[]>([]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [issue, setIssue] = useState("");
  // const [newCommentInputs, setNewCommentInputs] = useState<{
  //   [postId: string]: string;
  // }>({});
  const [reportId, setReportId] = useState<string>('');

  // const setNewCommentInputForPost = (postId: string, value: string) => {
  //   setNewCommentInputs((prevInputs) => ({ ...prevInputs, [postId]: value }));
  // };

  const fetchData = async () => {
    const response = await axiosInstance.get(`/product/get_all_posts`);
    console.log('dataa',response.data.posts)
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
    setNewComment("");
  };

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(
        `product/comments/${selectedPost?._id}`
      );
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const addComment = async () => {
    try {
      await axiosInstance
        .post(`product/addComment/${selectedPost?._id}`, {
          comment: newComment,
        })
        .then((response) => {
          console.log("commented", response.data);
        });
      setNewComment("");
      fetchComments(); // Fetch updated comments after adding a new comment
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleReport = (id: string) => {
 
    setReportId(id);
    setShowModal(true)

  }

  const handleReportSubmit = async () => {
    const response = await axiosInstance.post(`/product/report`,{
      data: {
        reportId,
        issue,
        subject
      }
    })

    setIssue('');
    setSubject('')
    setShowModal(false)

    if(response.data.success){
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }

  // const sharePost = async (id: string) => {

  // }

  const handleClose = () => {
    setIssue('');
    setSubject('')
    setShowModal(false)
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex justify-center min-h-screen">
      {/* Feeds Section */}
      <div className="flex">
        <div className="px-6 mt-20">
          <div className="">
            {feedsData?.length > 0 ? (
              feedsData?.map((data, index) => (
                <div
                  key={index}
                  className="max-w-xl mx-auto drop-shadow-2xl rounded-md overflow-hidden shadow-lg my-4 mt-14 border-2 border-slate-800 relative"
                >
                  <div className="flex flex-col p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={data?.userId?.image ? data?.userId?.image : userImage}
                          alt="User Profile"
                          className="w-9 h-9 object-fill rounded-full"
                        />
                        <div className="ml-4">
                          <button>
                            <Link to={`/profile/${data?.userId?._id}`}>
                              <h2 className="text-md font-semibold text-white">
                                {data?.userId?.firstName}{" "}
                                {data?.userId?.lastName}
                              </h2>
                            </Link>
                          </button>
                        </div>
                      </div>
                      <div>
                        <BsThreeDotsVertical
                          className="text-white cursor-pointer"
                          onClick={() => handleReport(data?._id)}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h2 className="text-sm text-white">{data.description}</h2>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Link to={`/postDetails/${data?._id}`}>
                      <img src={data.image} alt="Post" className="" />
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
                            data.likes
                              ? "text-indigo-500 hover:cursor-pointer "
                              : "text-gray-500 hover:cursor-pointer"
                          }`}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <TiMessage
                          className="h-6 w-6 text-indigo-500 hover:cursor-pointer"
                          onClick={() => openCommentModal(data)}
                        />
                        <span className="text-gray-600"></span>
                      </div>
                      {/* <div>
                        <button className="text-white" onClick={() => sharePost(data?._id)}>share</button>
                      </div> */}
                    </div>
                  </div>
                  <div className="ml-5 mb-2">
                    {data?.likes && (
                      <span className="text-white font-medium">
                        {data.likes.length} likes
                      </span>
                    )}
                  </div>
                  <div className="ml-5 mb-2">
                    {data?.comments && (
                      <span className="text-white font-medium">
                        {data.comments.length} comments
                      </span>
                    )}
                  </div>
                  {/* <div className="mb-1 flex items-center">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="w-full h-8 outline-none p-2 bg-black text-white text-sm"
                      value={newCommentInputs[data._id] || ""}
                      onChange={(e) =>
                        setNewCommentInputForPost(data._id, e.target.value)
                      }
                    />
                    {newCommentInputs[data._id] && (
                      <button
                        // onClick={() => addComment(data._id)}
                        className="mx-2 px-4 py-2 text-white rounded"
                      >
                        Post
                      </button>
                    )}
                  </div> */}
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

      {showCommentModal && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50 rounded-lg border-2 border-slate-800">
          <div className="bg-black w-3/4 mx-auto mt-20 p-4  flex rounded-lg border-2 border-slate-800 ">
            {/* Left side: Post Image */}
            <div className="flex-shrink-0 pr-4">
              <img
                src={selectedPost?.image}
                alt="Post"
                className="max-h-96 w-auto"
              />
            </div>

            {/* Right side: User Image, Profile, and Comments */}
            <div className="flex-grow">
              <div className="flex justify-end">
                <button
                  className="text-3xl cursor-pointer text-white"
                  onClick={closeCommentModal}
                >
                  &times;
                </button>
              </div>
              <h1 className="text-2xl font-bold mb-4 text-white">Comments</h1>

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
                        <p className="font- text-white">
                          {comment.user?.firstName} {comment.user?.lastName}
                        </p>
                      </div>
                      <p className="text-white">{comment?.commentText}</p>{" "}
                      {/* Assuming the comment text is stored in 'comment' field */}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white">No comments available.</p>
              )}

              <div className="mt-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full h-16 text-white p-2 bg-black outline-none rounded-lg border-2 border-slate-800"
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
        </div>
      )}

{showModal && (
  
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="bg-white p-8 rounded-lg">
      <button
        className="absolute top-2 right-2 text-gray-600"
        onClick={() => setShowModal(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h2 className="text-lg font-bold mb-4">Report an Issue</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Subject"
          className="w-full border rounded-md px-3 py-2"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Issue"
          className="w-full border rounded-md px-3 py-2"
          rows={4}
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
          onClick={handleReportSubmit}
        >
          Submit
        </button>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Feeds;
