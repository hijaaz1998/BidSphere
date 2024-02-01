import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosEndPoints/userAxios';
import { Link } from 'react-router-dom';

const LiveAuctions = () => {

  const [upcomingAuctions, setUpcomingAuctions] = useState<any[]>([])

  const fetchData = async () => {

    const res = await axiosInstance.get('/auction/getAuctions')

    setUpcomingAuctions(res.data.upcomingAuctions);
       
  }

  useEffect(() => {
    fetchData();
  },[])

  return (
    <div className="container mx-auto mt-20 bg-black">
      <h1 className="mb-6 text-2xl font-bold ml-4">Upcoming Auctions</h1>
      <div className="grid grid-cols-4 gap-6">
        {upcomingAuctions.map((data, index) => (
          <div key={index} className="card mx-auto px-6 bg-white mb-10 flex flex-col items-center py-5 drop-shadow-lg">
            <div className="flex justify-center">
              <img src={data?.postId?.image} alt="postImage" className="fixed-size-image-auction" />
            </div>
            <div className="card-content">
              <h3>{data?.postId?.productName}</h3>
              <p> Rs. {data?.currentAmount}</p>
            </div>
            <Link to={`/auctions/details/${data?._id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md">Bid Now</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveAuctions;
