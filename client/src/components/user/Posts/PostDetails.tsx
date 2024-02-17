import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosEndPoints/userAxios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PostDetails = ({ postDetail, isOwnPost }: { postDetail: any, isOwnPost: boolean }) => {

  const userId = JSON.parse(localStorage.getItem("userId") || "null");
  const [auctionId, setAuctionId] = useState<string | undefined>(undefined);
  const [favorited, setFavorited] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<any[]>([]); // Store the favorites list

  const getAuctionId = async () => {
    try {
      const response = await axiosInstance.get(`/auction/getAuction/${postDetail._id}`);
      setAuctionId(response.data.id);
    } catch (error) {
      console.error('Error fetching auction ID:', error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await axiosInstance.get(`/user/getFavorite/${userId}`);
      console.log("response.data.favorites.posts",response.data.favorites);
      
      setFavorites(response.data.favorites); // Update the favorites list
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  }

  useEffect(() => {
    if (postDetail?.isAuctioned) {
      getAuctionId(); 
    }
  }, [postDetail?.isAuctioned]);

  useEffect(() => {
    fetchFavorites();
  }, [favorited]);

  const handleAddToFavorites = async (id: string) => {
    try {
      const response = await axiosInstance.post('/product/add_to_favorites', { postId: id });
      toast.success(response.data.message);
      setFavorited(true);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  
  const isPostInFavorites = favorites.length > 0 && favorites[0].posts.some((post: { _id: any; }) => post._id === postDetail._id);

  return (
    <div className=" bg-black p-6 shadow-md flex items-center justify-center h-sc mt-4 text-white rounded-lg border-2 border-slate-800 ">
      <div className="">
        <img src={postDetail?.image} alt="PostImage" className="h-full" />
      </div>

      <div className="w-1/2 h-full ml-10 mt-10">
        <div className="flex items-center justify-center flex-col">
          <h2 className="text-2xl mb-2">{postDetail?.productName}</h2>
          <p className="text-white mb-2">{postDetail?.description}</p>

          <div className="flex items-center flex-col mb-2">
            <div className="text-white mb-2">Age: {postDetail?.age}</div>
            <div className="text-white mb-2">Condition: {postDetail?.condition}</div>
            <div className="text-white">Rarity: {postDetail?.rarity}</div>
          </div>

          {/* Only show "Add to Favorites" button if not in favorites */}
          {!isOwnPost && !isPostInFavorites && (
            <button onClick={() => handleAddToFavorites(postDetail?._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add to Favorites
            </button>
          )}

          {postDetail?.isAuctioned && (
            <Link to={`/auctions/details/${auctionId}`}>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Go to Auction
              </button>
            </Link>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
