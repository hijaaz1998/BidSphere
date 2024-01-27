import React, { useState, useEffect } from "react";
import axiosInstance from "../../../axiosEndPoints/userAxios";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  comments: string[];
  updateComments: (newComments: string[]) => void;
}

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  postId,
  comments,
  updateComments,
}) => {
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`product/comments/${postId}`);
      updateComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const addComment = async () => {
    try {
      await axiosInstance.post(`/comments/${postId}`, { comment: newComment });
      setNewComment("");
      fetchComments(); // Fetch updated comments after adding a new comment
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen]);

  return (
    <div className={`modal ${isOpen ? "block" : "hidden"}`}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="modal-container bg-white w-1/2 mx-auto mt-20 p-4">
        <div className="flex justify-end">
          <button className="text-3xl cursor-pointer" onClick={onClose}>
            &times;
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-4">Comments</h1>
        {comments ? (
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment}</li>
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
  );
};

export default CommentModal;
