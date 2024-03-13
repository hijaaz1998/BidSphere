import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosEndPoints/userAxios';
import { Link } from 'react-router-dom';

// interface UserIdProps {
//   userId: Readonly<Params<string>>
// }

const Posts: React.FC<any> = ({userId}) => {

  const [posts, setPosts] = useState<any[]>([]);

  const fetchMyposts = async () => {
    const response = await axiosInstance.get(`/product/getPosts/${userId}`)
    setPosts(response.data.myProducts)
  }

  useEffect(() => {
    fetchMyposts();
  },[userId]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 rounded-md  border-2 border-slate-800 p-5">
      {posts?.map((post) => ( 
        <div key={post._id} className="rounded-md">
          <Link to={`/postDetails/${post._id}`}>
            <img src={post?.image} alt="image" />
          </Link>
        </div>
      ))}
    </div>
  )
};

export default Posts;
