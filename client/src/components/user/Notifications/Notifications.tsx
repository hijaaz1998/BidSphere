import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosEndPoints/userAxios";
import { Link } from "react-router-dom";

interface Notification {
    [x: string]: any;
    _id: string;
    message: string; // Assuming the notification has a 'message' field
}

interface Props {
    notifications: Notification[];
}

const Notifications: React.FC<Props> = ({ notifications }) => {
    
    const [notification, setNotification] = useState<Notification[]>([]);

    const changeIsRead = async () => {
        const response = await axiosInstance.put('/auction/change_is_read')
        setNotification(response.data.updated)        
    }

    useEffect(() => {
        setNotification(notifications);
        changeIsRead();
    }, []);

    return (
        <div className="top-28 mt-32 min-h-screen w-full">
            {notification && notification.length > 0 ? (
                notification.map((list) => (
                    <div
                        key={list?._id}
                        className="border rounded p-4 mb-4 shadow-md flex items-center"
                    >
                        <Link to={`/auctions/details/${list?.auctionId?._id}`}>
                        <img
                            src={list?.auctionId?.postId?.image}
                            alt="image"
                            className="w-16 h-16 rounded-full mr-4"
                        />
                        </Link>
                         <div className="flex-grow">
                            <h2 className="text-lg font-bold text-white">{`${list?.auctionId?.postId?.productName}`}</h2>
                        </div>
                        <div onClick={changeIsRead} className="flex-grow cursor-pointer">
                            <h2 className="text-lg font-bold text-white">{list.message}</h2>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-white">No notifications available.</p>
            )}
        </div>
    );
};

export default Notifications;
