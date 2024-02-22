import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosEndPoints/userAxios';
import { Link } from 'react-router-dom';

const LiveAuctions = () => {

  const [upcomingAuctions, setUpcomingAuctions] = useState<any[]>([]);
  const userId = JSON.parse(localStorage.getItem("userId") || "null");

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get('/auction/getAuctions');
      console.log("auctions",res.data.upcomingAuctions);
      
      const filteredAuctions = res.data.upcomingAuctions.filter((auction: any) => auction.postId.userId._id !== userId)
      setUpcomingAuctions(filteredAuctions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-10 bg-black">
      <h1 className="mb-6 text-2xl font-bold ml-4">Auctions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {upcomingAuctions.map((data, index) => (
          <div key={index} className="card mx-auto px-6 bg-black mb-10 flex flex-col items-center py-5 border-2 border-slate-800 shadow-lg">
            <div className="flex justify-center mb-2">
              <img src={data?.postId?.image} alt="postImage" className="fixed-size-image-auction" />
            </div>
            <div className="card-content">
              <h3 className='text-white'>{data?.postId?.productName}</h3>
              <p className='text-white'>Rs. {data?.currentAmount}</p>
            </div>
            <Link to={`/auctions/details/${data?._id}`}>
              <button className=" text-white px-4 py-2 mt-2 rounded-md border-2 border-slate-800 hover:bg-indigo-500 hover:text-white">Bid Now</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveAuctions;
