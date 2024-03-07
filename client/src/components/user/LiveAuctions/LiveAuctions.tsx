import { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosEndPoints/userAxios';
import { Link } from 'react-router-dom';
import { AuctionDetails } from '../../../interfaces/Interface';

const LiveAuctions = () => {
  const [upcomingAuctions, setUpcomingAuctions] = useState<AuctionDetails[]>([]);
  const userId = JSON.parse(localStorage.getItem("userId") || "null");

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get('/auction/getAuctions');      
      const filteredAuctions = res.data.upcomingAuctions.filter((auction: AuctionDetails) => auction.postId.userId._id !== userId)
      setUpcomingAuctions(filteredAuctions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-9 bg-black h-full">
      {upcomingAuctions.length === 0 ? (
        <div className='flex justify-center align-center'>
        <p className="text-white text-center">Currently there are no auctions available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {upcomingAuctions.map((data, index) => (
            <div key={index} className="card mx-auto px-6 bg-black mb-10 flex flex-col items-center py-5 border-2 mt-10 border-slate-800 shadow-lg">
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
      )}
    </div>
  );
};

export default LiveAuctions;
