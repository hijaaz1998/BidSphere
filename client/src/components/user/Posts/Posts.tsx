// Post.jsx
import React, { useEffect, useState } from "react";
import userImage from "../assets/User Avatar Vector Design Images, User Vector Avatar, Human Clipart, Female User, Icon PNG Image For Free Download.jpg"; // replace with actual path
import axiosInstance from "../../../axiosEndPoints/userAxios";
import { login } from "../../../slices/userSlice";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  productName: string;
  image: string;
}

interface UserData {
  firstName: string;
  lastName: string;
}

const Posts = () => {
  
  const [products, setProducts] = useState<Product[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null)

  const fetchData = async () => {
    try {

      const data = localStorage.getItem('userData');
        if(data){
        const parsed = JSON.parse(data);
        setUserData(parsed)
        } 

      const response = await axiosInstance.get(
        `/product/getProducts`
      );
      const fetchedProducts = response.data.myProducts;
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" bg-gray-400 min-h-screen px-6 overflow-hidden">
      {products?.slice()?.reverse()?.map((product, index) => (
        <div
          key={index}
          className="max-w-xl mx-auto bg-white rounded-md overflow-hidden shadow-lg my-4 mt-14"
        >
          {/* User Profile Section */}
          <div className="flex items-center p-4">
            <img
              src={userImage}
              alt="User Profile"
              className="w-12 h-12 object-cover rounded-full"
            />
            <div className="ml-4">
              <h2 className="text-lg font-semibold">{`${userData?.firstName} ${userData?.lastName}`}</h2>
            </div>
          </div>

          <div className="flex justify-center">
          <Link to={`/postDetails/${product._id}`} >
            <img
            src={product.image}
            alt="Post"
            className="fixed-size-image "
            />
          </Link>
          </div>

          {/* Post Actions Section */}
          <div className="flex justify-between p-4">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>

              <span className="text-gray-600">Like</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-gray-600">Comment</span>
            </div>
          </div>
        </div>
      ))}

      {products.length === 0 && (
        <div>Nothing To Show</div>
      )}
    </div>
  );
};

export default Posts;
