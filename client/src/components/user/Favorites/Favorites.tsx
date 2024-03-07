import { useEffect, useState } from 'react'
import axiosInstance from '../../../axiosEndPoints/userAxios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Product } from '../../../interfaces/Interface';


const Favorites = () => {
    const [favorites, setFavorites] = useState<Product[]>([]);

    const fetchFavorites = async () => {
        const response = await axiosInstance.get('/product/get_favorites')
        console.log("fav",response.data.favorites)
        setFavorites(response.data.favorites)
    }

    useEffect(() => {
        fetchFavorites();
    },[])
    const removeFavorite = async (id: string) => {
        await axiosInstance.put(`/product/remove_favorite/${id}`)
        toast.success('Removed Succcessfully')        
    }

  return (
    <div className="top-28 mt-32 h-screen w-full">
        {favorites && favorites.length > 0 ? (
            <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 border-b border-gray-600">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Is Auctioned</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-black">
              {favorites.map((list) => (
                <tr key={list._id} className="text-white">
                  <td className="px-4 py-3 border">
                    <Link to={`/postDetails/${list._id}`}>
                        <div className="flex items-center text-sm">
                        <div className="relative w-16 h-16 mr-3 rounded-full md:block">
                            <img
                            className="object-cover w-full h-full rounded-full"
                            src={list.image}
                            alt={list.productName}
                            loading="lazy"
                            />
                            <div
                            className="absolute inset-0 rounded-full shadow-inner"
                            aria-hidden="true"
                            />
                        </div>
                        <div>
                            <p className="font-semibold">{list.productName}</p>
                        </div>
                        </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-xs border">
                    {list.isAuctioned ? (
                            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                                On Auction
                            </span>
                    ) : (
                        <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                        Not Auctioned
                        </span>
                    )}
                  </td>

  
                  <td className="px-4 py-3 text-sm border"><button onClick={() => removeFavorite(list._id)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
            <p className="text-white">Currently no Favorites.</p>
        )}
    </div>
  )
}

export default Favorites