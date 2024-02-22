import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosEndPoints/userAxios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyBids = () => {
    const [bids, setBids] = useState<any[]>([]);

    useEffect(() => {
        fetchMyBids();
    }, []);

    const fetchMyBids = async () => {
        try {
            const response = await axiosInstance.get('/auction/get_my_bids');
            console.log("bids", response.data.myBids);
            setBids(response.data.myBids);
        } catch (error) {
            console.error("Error fetching bids:", error);
        }
    };

    const removeItem = async (bidId: string) => {
        try {
            const response = await axiosInstance.put(`/auction/abort_bid/${bidId}`);
            toast.success('Aborted auction')
        } catch (error) {
            console.error("Error removing bid:", error);
        }
    };

    return (
        <div className="top-28 mt-32 h-full w-full">
            {bids && bids.length > 0 ? (
                <table className="w-full">
                    <thead>
                        <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 border-b border-gray-600">
                            <th className="px-4 py-3">Product</th>
                            <th className="px-4 py-3">Bid</th>
                            <th className="px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-black">
                        {bids.map((bid) => (
                            <tr key={bid._id} className="text-white">
                                <td className="px-4 py-3 border">
                                <Link to={`/auctions/details/${bid.auctionId._id}`}>
                                    <div className="flex items-center text-sm">
                                        <div className="relative w-16 h-16 mr-3 rounded-full md:block">
                                            <img
                                                className="object-cover w-full h-full rounded-full"
                                                src={bid.auctionId.postId.image}
                                                alt={bid.auctionId.postId.productName}
                                                loading="lazy"
                                            />
                                            <div
                                                className="absolute inset-0 rounded-full shadow-inner"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{bid.auctionId.postId.productName}</p>
                                        </div>
                                    </div>
                                </Link>
                                </td>
                                <td className="px-4 py-3 text-ms font-semibold border">
                                <span style={{ color: bid.currentAmount === bid.auctionId.currentAmount ? 'green' : 'red' }}>
                                    {bid.currentAmount === bid.auctionId.currentAmount ? 'currently you have the bid' : 'currently you dont have the bid'}
                                </span>
                                </td>
                                <td className="px-4 py-3 text-sm border">
                                    <button onClick={() => removeItem(bid._id)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-white">You didn't participate in any auction</p>
            )}
        </div>
    );
};

export default MyBids;
