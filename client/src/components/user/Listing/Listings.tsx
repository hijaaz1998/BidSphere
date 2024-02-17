import { useStatStyles } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosEndPoints/userAxios";
import { toast } from "react-toastify";

const Listings = () => {

    console.log("rendering");
    
    const [listings, setListings] = useState<any[]>([]);

    const fetchListings = async () => {
        const response = await axiosInstance.get('/auction/get_my_listings')
        setListings(response.data.listings)
    }

    const removeItem = async (id: any) => {
        const response = await axiosInstance.patch(`/auction/removeAuction/${id}`)

        if(response.data.removed){
            toast.success("Removed successfully")
        }
    }

    useEffect(() => {
        fetchListings();
    },[])

  return (
    <div className="top-28 mt-32 h-full w-full">
        {listings && listings.length > 0 ? (
            listings.map((list) => (
            <div
                key={list._id}
                className="border rounded p-4 mb-4 shadow-md flex items-center"
            >
                <img
                src={list.postId.image}
                alt={list.postId.productName}
                className="w-16 h-16 rounded-full mr-4"
                />
                <div className="flex-grow">
                <h2 className="text-lg font-bold text-white">{list.postId.productName}</h2>
                </div>
                <button onClick={() => removeItem(list._id)} className="text-white border-2">
                Remove Item
                </button>
            </div>
            ))
        ) : (
            <p className="text-white">No auctions have been set.</p>
        )}
    </div>

  )
};

export default Listings;
