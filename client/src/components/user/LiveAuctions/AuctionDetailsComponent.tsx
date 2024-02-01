import React, { useEffect, useState } from 'react';
import image from '../assets/Old globe.jpg';
import axiosInstance from '../../../axiosEndPoints/userAxios';
import { toast } from 'react-toastify';

interface AuctionId {
  auctionId: string | undefined;
}

const AuctionDetailsComponent: React.FC<AuctionId> = (auctionId) => {
  const [data, setData] = useState('');
  const [customAmount, setCustomAmount] = useState<string>('');

  const fetchData = async () => {
    const res = await axiosInstance.get(`/auction/auctionDetails/${auctionId.auctionId}`);
    setData(res.data.details);
    console.log('response auction', res.data.details);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleButtonClick = (value: number) => {
    performAction(value);
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

    
    const updated = await axiosInstance.post('/auction/bid', {
        auctionId: auctionId,
        amount : amount
      });

      if(updated){
        toast.success(`Congradulations! Rs ${amount} has been Bidded`)
        setData(updated.data.updated);
        console.log("updatedAuction",updated);
      }    
      
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="bg-white rounded-xl overflow-hidden shadow-md h-120 flex items-center">
        <div className="flex-shrink-0 w-1/2">
          <img src={data?.postId?.image} alt="Product" className="w-full h-full object-contain max-w-96 max-h-96" />
        </div>
        <div className="p-8 w-1/2 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold mb-4">{data?.postId?.productName}</h2>
          <p className="mb-4">
            Current Amount: <span className="text-green-600 font-extrabold">{data?.currentAmount}</span>
          </p>


          <div className="mb-4">
            <button onClick={() => handleButtonClick(100)} className="mr-2 bg-blue-500 text-white px-4 py-2 rounded">
              100
            </button>
            <button onClick={() => handleButtonClick(200)} className="mr-2 bg-blue-500 text-white px-4 py-2 rounded">
              200
            </button>
            <button onClick={() => handleButtonClick(500)} className="bg-blue-500 text-white px-4 py-2 rounded">
              500
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="customAmount" className="block mb-2">
              Custom Amount:
            </label>
            <input
              type="text"
              id="customAmount"
              value={customAmount}
              onChange={handleInputChange}
              placeholder="Enter amount"
              className="border border-gray-300 px-4 py-2 rounded mb-2 mr-5"
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              BID
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetailsComponent;
