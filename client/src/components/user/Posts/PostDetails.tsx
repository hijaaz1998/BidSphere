import React, { useEffect, useState } from 'react';
import image from '../assets/Old globe.jpg'
import axiosInstance from '../../../axiosEndPoints/userAxios';


// interface PostDetailsProps {
//     _id: string;
//     productName: string;
//     image: string;
//     userId: {
//       _id: string;
//       firstName: string;
//       lastName: string;
//     };
//     createdOn: string;
//     comments: any[]; 
//     likes: any[];   
//     description?: string
//   }


const PostDetails = (postDetail: any) => {

  const postDetails = postDetail.postDetail;
  

  return (
    <div className=" bg-black p-6 shadow-md flex items-center justify-center h-sc mt-4 text-white rounded-lg border-2 border-slate-800 ">
      <div className=''>
        <img
          src={postDetails?.image}
          alt="PostImage"
          className="h-full"
        />
      </div>

      <div className="w-1/2 h-full ml-10 mt-10">
        <div className='flex items-center justify-center flex-col'>
          <h2 className="text-2xl mb-2">{postDetails?.productName}</h2>
          <p className="text-white mb-2">{postDetails?.description}</p>

          {/* Additional Information */}
          <div className="flex items-center flex-col mb-2">
            <div className="text-white mb-2">Age: {postDetails?.age}</div>
            <div className="text-white mb-2">Condition: {postDetails?.condition}</div>
            <div className="text-white">Rarity: {postDetails?.rarity}</div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default PostDetails;
