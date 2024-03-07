import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosEndPoints/userAxios";
import { toast } from "react-toastify";
import { AuctionListing } from "../../../interfaces/Interface";


const MyListings = () => {

  const [listings, setListings] = useState<AuctionListing[]>([]);

  const fetchListings = async () => {
      const response = await axiosInstance.get('/auction/get_my_listings')   
      console.log('list', response.data.listings)   
      setListings(response.data.listings)
  }

  const removeItem = async (id: string) => {
      const response = await axiosInstance.patch(`/auction/removeAuction/${id}`)

      if(response.data.removed){
          toast.success("Removed successfully")
      }
  }

  useEffect(() => {
      fetchListings();
  },[])

  return (
    <section className="container mx-auto p-6 font-mono h-screen">
  <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
    <div className="w-full overflow-x-auto">
      {listings && listings.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 border-b border-gray-600">
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Bid</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="bg-black">
            {listings.map((list) => (
              <tr key={list._id} className="text-white">
                <td className="px-4 py-3 border">
                  <div className="flex items-center text-sm">
                    <div className="relative w-16 h-16 mr-3 rounded-full md:block">
                      <img
                        className="object-cover w-full h-full rounded-full"
                        src={list.postId.image}
                        alt={list.postId.productName}
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 rounded-full shadow-inner"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{list.postId.productName}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-ms font-semibold border">{list.currentAmount}</td>

                <td className="px-4 py-3 text-sm border"><button onClick={() => removeItem(list._id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-white">No auctions have been set.</p>
      )}
    </div>
  </div>
</section>

  
  );
};

export default MyListings;
