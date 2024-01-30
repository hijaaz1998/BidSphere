import React, { useEffect, useState } from 'react';
import image from '../../assets/Old globe.jpg'
import axiosInstance from '../../../../axiosEndPoints/userAxios';
import Pagination from '../../../Pagination/Pagination';

const PostsMgt = () => {
    
    const [postData, setPostData] = useState<any[]>([]);
    const [update, setUpdate] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5); 
    

  const blockUser = () => {

  };

  const fetchPosts = async () => {
    const response = await axiosInstance.get('/admin/getPosts');
    console.log("postData", response.data.posts);
    
    setPostData(response.data.posts)

  }

  
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = postData.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(postData.length / recordsPerPage);

  useEffect(() => {
    fetchPosts();
  },[]);

  return (
    <>
        <div className='top-28 ml-96 mt-32'>
        {currentRecords.map((post) => (
            <div key={post._id} className="border rounded p-4 mb-4 shadow-md flex items-center">
            <img
                src={post.image}
                alt={post.firstName}
                className="w-16 h-16 rounded-full mr-4"
            />
            <div className="flex-grow">
                <h2 className="text-lg font-bold">{`${post?.userId?.firstName} ${post?.userId?.lastName}`}</h2>
            </div>
            <button
                onClick={() => blockUser()}
                className={`py-2 px-4 rounded focus:outline-none ${
                    post.isBlocked
                    ? 'bg-green-500  text-white'
                    : 'bg-red-500  text-white'
                }`}
            >
                {post.isBlocked ? 'Unblock' : 'Block'}
            </button>
            </div>
        ))}
        </div>
        <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
        />
    </>
  );
};

export default PostsMgt;
