import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosEndPoints/userAxios";
import image from "../assets/User Avatar Vector Design Images, User Vector Avatar, Human Clipart, Female User, Icon PNG Image For Free Download.jpg";
import { Params, Link, useNavigate } from "react-router-dom";

interface Follower {
  id: number;
  username: string;
  image: string;
}

interface UserIdProps {
  userId: Readonly<Params<string>>;
}

interface FollowersProps {
  followers: Follower[];
}

const Followers: React.FC<any> = ({ userId, setActiveTab }) => {
  const [followers, setFollwers] = useState<any[]>([]);

  const navigate = useNavigate();

  const fetchFollwers = async () => {
    const response = await axiosInstance.get(`/user/getFollowers/${userId}`);
    setFollwers(response.data.followers);
  };

  useEffect(() => {
    fetchFollwers();
  }, [userId]);

  const handleChange = (followeId: string) => {
    setActiveTab("posts");
    navigate(`/profile/${followeId}`);
  };

  return (
    <div>
      {followers.map((follower) => (
        <div
          key={follower._id}
          className="flex items-center bg-black p-2 rounded-md mb-2"
        >
          <img
            src={image}
            alt={follower.username}
            className="w-8 h-8 object-cover rounded-full mr-2"
          />
          <p
            onClick={() => handleChange(follower._id)}
            className="text-white hover:underline hover:cursor-pointer"
          >
            {follower.firstName} {follower.lastName}
          </p>
          {/* <Link to={`/profile/${follower?._id}`}></Link> */}
        </div>
      ))}
    </div>
  );
};

export default Followers;
