import React, { useEffect, useState } from 'react';
import image from '../assets/Old globe.jpg'
import axiosInstance from '../../../axiosEndPoints/userAxios';

interface PostDetailsProps {
    postId: string | undefined;
}

interface PostData {
    _id: string;
    productName: string;
    image: string;
    userId: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    createdOn: string;
    comments: any[]; 
    likes: any[];   
    description?: string
  }


const PostDetails: React.FC<PostDetailsProps> = ({ postId }) => {

    const [data, setData] = useState<PostData  | null>(null);

    const fetchPostData = async () => {

        const response = await axiosInstance.get(`/product/postDetails/${postId}`)
        console.log(response.data);
        
        setData(response.data)        
    }

    useEffect(() => {        
        fetchPostData();
    },[]);


  return (
    <div className="bg-gray-100 p-6 rounded shadow-md flex items-center justify-center h-full mt-4">
  <img
    src={data?.image}
    alt="PostImage"
    className="fixed-size-image-details"
  />

  <div className="w-1/2 h-full">
    <div className="flex items-center mb-2">
      <img
        src={image}
        alt="ProfileImage"
        className="w-8 h-8 rounded-full mr-2"
      />
      <span className="text-gray-700">{data?.userId?.firstName} {data?.userId?.lastName}</span>
    </div>

    <div className='flex items-center justify-center flex-col'>
      <h2 className="text-2xl font-bold mb-2">{data?.productName}</h2>

      <p className="text-gray-700 mb-2">{data?.description}</p>

      {/* Additional Information */}
      <div className="flex items-center mb-2">
        <span className="text-gray-700 mr-2">Age: {data?.age}</span>
        <span className="text-gray-700 mr-2">Condition: {data?.condition}</span>
        <span className="text-gray-700">Rarity: {data?.rarity}</span>
      </div>
    </div>
  </div>
</div>

  );
};

export default PostDetails;
