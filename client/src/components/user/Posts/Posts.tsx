// Post.jsx
import React, { useEffect, useState } from "react";
import userImage from "../assets/User Avatar Vector Design Images, User Vector Avatar, Human Clipart, Female User, Icon PNG Image For Free Download.jpg"; // replace with actual path
import axiosInstance from "../../../axiosEndPoints/userAxios";
import { login } from "../../../slices/userSlice";
import { Link } from "react-router-dom";
import { TiThumbsUp, TiMessage } from 'react-icons/ti'; // Import react-icons

interface Product {
  _id: string;
  productName: string;
  image: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  _id: any
}

const Posts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);

  const fetchData = async () => {
    try {

      const data = localStorage.getItem('userData');
      if (data) {
        const parsed = JSON.parse(data);
        setUserData(parsed);
      }

      const response = await axiosInstance.get(`/product/getProducts`);
      const fetchedProducts = response.data.myProducts;
      console.log("fetchedProducts",fetchedProducts);
      
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" bg-black min-h-screen px-6 overflow-hidden">
      {products?.slice()?.reverse()?.map((product, index) => (
        <div
          key={index}
          className="max-w-xl mx-auto bg-black rounded-md overflow-hidden shadow-lg my-4 mt-14 border-2 border-slate-800"
        >
          {/* User Profile Section */}
          <div className="flex items-center p-4">
            <img
              src={userImage}
              alt="User Profile"
              className="w-12 h-12 object-cover rounded-full"
            />
            <div className="ml-4">
              <Link to={`/profile/${userData?._id}`}>
                <h2 className="text-sm text-white font-semibold">{`${userData?.firstName} ${userData?.lastName}`}</h2>
              </Link>
            </div>
          </div>
          <div className="">
              <h2 className="text-sm text-white font-semibold mb-4 flex justify-center ">{product?.description}</h2>
          </div>

          <div className="flex justify-center ">
            <Link to={`/postDetails/${product._id}`}>
              <img
                src={product.image}
                alt="Post"
                className=" "
              />
            </Link>
          </div>

          {/* Post Actions Section */}
          <div className="flex justify-between p-4">
            <div className="flex items-center space-x-4">
              
            </div>
          </div>
        </div>
      ))}

      {products.length === 0 && (
        <div className="text-white">Nothing To Show</div>
      )}
    </div>
  );
};

export default Posts;
