import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosEndPoints/userAxios';
import { toast } from 'react-toastify';
import io, {Socket} from 'socket.io-client';
import { AuctionDetails, bidData } from '../../../interfaces/Interface';



let socket: Socket

interface AuctionDetail {
  auctionId: string | undefined;
}

const AuctionDetailsComponent: React.FC<AuctionDetail> = ({ auctionId }) => {
  const ENDPOINT = 'http://localhost:5001';
  const userIdString = localStorage.getItem('userId');
  const userId = userIdString ? JSON.parse(userIdString) : null;

  const [data, setData] = useState<AuctionDetails>();
  const [customAmount, setCustomAmount] = useState<string>('');
  const [time, setTime] = useState<number>(0);
  // const [firstName, setFirstName] = useState();
  // const [lastName, setLastName] = useState();

  const fetchData = async () => {
    try {
        const res = await axiosInstance.get(`/auction/auctionDetails/${auctionId}`);
        setData(res.data.details);
        const endingDate = new Date(res.data.details.endingDate);
        const currentTime = new Date();
        const differenceInMilliseconds = Math.max(0, endingDate.getTime() - currentTime.getTime());
        setTime(differenceInMilliseconds);

        if (res.data.details.currentBidder) {
            // setFirstName(res.data.details.currentBidder.firstName);
            // setLastName(res.data.details.currentBidder.lastName);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch auction details');
    }
};


  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('joinAuction', auctionId);

    return () => {
      socket.emit('leaveAuction', auctionId);
    };
  }, [auctionId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => Math.max(0, prevTime - 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  
  

  useEffect(() => {
    socket.on('bid', (bidData: bidData) => {
      fetchData();
      if (bidData.userId !== userId) {
        toast.info(`New bid: ${bidData?.firstName} ${bidData?.lastName} has bidded  Rs ${bidData.amount}`);
      }
    });
  
    return () => {
      socket.off('bid');
    };
  }, [userId]);
  

  useEffect(() => {
    fetchData();
  }, [auctionId]);

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

  const auctionCompleted = async () => {    
    await axiosInstance.put(`/auction/auction_completed/${data?._id}`).then((response) => {      
      setData(response.data.updated)
    })
  }

  useEffect(() => {
    
    if(time === 0 && data?.isCompleted === false) {
      
      auctionCompleted();
      
    }
  },[time])

  const performAction = async (amount: number) => {
    try {
      
      const updated = await axiosInstance.post('/auction/bid', {
        auctionId: auctionId,
        amount: amount
      });

      if (updated) {        
        toast.success(`Congratulations! Rs ${amount} has been Bidded`);
        socket.emit('bidded', { amount, userId, auctionId, firstName: updated?.data?.updated?.currentBidder?.firstName, lastName: updated?.data?.updated?.currentBidder?.lastName });        
        setData(updated.data.updated);
      }
    } catch (error) {
      console.error('Error performing action:', error);
      toast.error('Failed to place bid');
    }
  };

  function loadScript(src: string) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

async function displayRazorpay() {
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    const result = await axiosInstance.post(`/auction/payment/${data?._id}`)

    if (!result) {
        alert("Server error. Are you online?");
        return;
    }
    
    const { amount, id: order_id, currency, } = result.data.paid;
    const {auctionId} = result.data;
    const {paymentId} = result.data;

    const options = {
        key: "rzp_test_fWH63GUDMTI221",
        amount: amount,
        currency: currency,
        name: "Soumya Corp.",
        description: "Test Transaction",
        image: '',
        order_id: order_id,
        handler: async function (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string; }) {
            const data = {
                paymentId,
                auctionId,
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };

            const result = await axiosInstance.post("/auction/paymentverification", data);
            
            setData(result.data.update)

        },
        prefill: {
            name: "Soumya Dey",
            email: "SoumyaDey@example.com",
            contact: "9999999999",
        },
        notes: {
            address: "Soumya Dey Corporate Office",
        },
        theme: {
            color: "#61dafb",
        },
    };
    if (window.Razorpay) {
      const paymentObject = new window.Razorpay(options); // Creating a new instance of Razorpay
      paymentObject.open(); // Opening the payment dialog
    } else {
      // Handle case where Razorpay is not available
      alert("Razorpay SDK is not available");
    }
}

  const getFormattedTime = (time: number) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4 h-screen">
    {data ? (
      <div className="bg-black rounded-xl overflow-hidden shadow-md md:flex md:items-center border-2 border-slate-800 ">
        <div className="md:flex-shrink-0 md:w-1/2">
          <img src={data.postId.image} alt="Product" className="w-full h-full object-cover md:max-h-96" />
        </div>
        <div className="p-8 md:w-1/2 flex flex-col justify-center items-center">
          {data.isBlocked ? (
            <div className="bg-black rounded-xl overflow-hidden shadow-md md:flex md:items-center border-2 border-slate-800 p-8">
              <p className="text-white">Currently the auction has been blocked.</p>
            </div>
          ) : data.isCompleted ? (
            <div className="bg-black rounded-xl overflow-hidden shadow-md md:flex md:items-center border-2 border-slate-800 p-8">
              {data.winner === userId ? (
                <>
                  <p className="text-white">Congratulations for the win!</p>
                  {data.isPaid ? (
                    <p className="text-white">Payment is done. Once the admin verifies, an email will be sent to you.</p>
                  ) : (
                    <button onClick={displayRazorpay} className='text-indigo-500 bg-black rounded-xl drop-shadow-2xl overflow-hidden shadow-lg border-2 border-slate-800 p-2 hover:bg-indigo-500 hover:text-white'>Pay Now</button>
                  )}
                </>
              ) : (
                <p className="text-white">The auction has ended.</p>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  
  );
};

export default AuctionDetailsComponent;
