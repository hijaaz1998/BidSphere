import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosEndPoints/userAxios';
import { toast } from 'react-toastify';

interface AuctionId {
  auctionId: string | undefined;
}

const AuctionDetailsComponent: React.FC<AuctionId> = ({ auctionId }) => {
  const [data, setData] = useState<any>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [time, setTime] = useState<number>(0);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(`/auction/auctionDetails/${auctionId}`);
      setData(res.data.details);
      const endingDate = new Date(res.data.details.endingDate);
      const currentTime = new Date();
      const differenceInMilliseconds = Math.max(0, endingDate.getTime() - currentTime.getTime());
      setTime(differenceInMilliseconds);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch auction details');
    }
  };

  useEffect(() => {
    fetchData();
  }, [auctionId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => Math.max(0, prevTime - 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleButtonClick = (amount: number) => {
    performAction(amount);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const numericAmount = parseInt(customAmount, 10) || 0;
    performAction(numericAmount);
    setCustomAmount('');
  };

  const performAction = async (amount: number) => {
    try {
      const updated = await axiosInstance.post('/auction/bid', {
        auctionId: auctionId,
        amount: amount
      });

      if (updated) {
        toast.success(`Congratulations! Rs ${amount} has been Bidded`);
        setData(updated.data.updated);
      }
    } catch (error) {
      console.error('Error performing action:', error);
      toast.error('Failed to place bid');
    }
  };

  const getFormattedTime = (time: number) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4 h-full">
      {data && (
        <div className="bg-black rounded-xl overflow-hidden shadow-md md:flex md:items-center border-2 border-slate-800 ">
          <div className="md:flex-shrink-0 md:w-1/2">
            <img src={data.postId.image} alt="Product" className="w-full h-full object-cover md:max-h-96" />
          </div>
          <div className="p-8 md:w-1/2 flex flex-col justify-center items-center">
            <span className='text-white'>{getFormattedTime(time)}</span>
            <h2 className="text-2xl font-medium text-white mb-4">{data.postId.productName}</h2>
            <p className="mb-4">
              <span className='text-white'>Current Amount:</span> <span className="text-green-600 font-extrabold">{data.currentAmount}</span>
            </p>
            <div className="mb-4">
              <button onClick={() => handleButtonClick(100)} className="mr-2 text-indigo-500 px-4 py-2 rounded border-2 border-slate-800 hover:bg-indigo-500 hover:text-white">
                100
              </button>
              <button onClick={() => handleButtonClick(200)} className="mr-2  text-indigo-500 px-4 py-2 rounded  border-2 border-slate-800 hover:bg-indigo-500 hover:text-white">
                200
              </button>
              <button onClick={() => handleButtonClick(500)} className=" text-indigo-500 px-4 py-2 rounded border-2 border-slate-800 hover:bg-indigo-500 hover:text-white">
                500
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="customAmount" className="block mb-2 text-white">
                Custom Amount:
              </label>
              <input
                type="text"
                id="customAmount"
                value={customAmount}
                onChange={handleInputChange}
                placeholder="Enter amount"
                className=" px-4 py-2 text-white rounded mb-2 mr-5 outline-none bg-black border-2 border-slate-800"
              />
              <button type="submit" className="b text-indigo-500 px-4 py-2 rounded border-2 border-slate-800 hover:bg-indigo-500 hover:text-white">
                BID
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionDetailsComponent;
