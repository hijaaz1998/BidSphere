import React, { ChangeEvent, useEffect, useState } from "react";
import profile from "../assets/User Avatar Vector Design Images, User Vector Avatar, Human Clipart, Female User, Icon PNG Image For Free Download.jpg";
import Posts from "../Profile/Posts";
import Following from "../Profile/Following";
import Followers from "../Profile/Followers";
import axiosInstance from "../../../axiosEndPoints/userAxios";
import { toast } from "react-toastify";
import axios from "axios";

// interface userIdProps {
//   userId: Readonly<Params<string>>;
// }

// interface UserProfile {
//   photo: string;
//   name: string;
//   followersCount: number;
//   followingCount: number;
//   postsCount: number;
//   posts: Post[];
//   followers: Follower[];
//   following: FollowingUser[];
// }

// interface Post {
//   id: number;
//   image: string;
//   caption: string;
// }

// interface Follower {
//   id: number;
//   username: string;
//   image: string;
// }

// interface FollowingUser {
//   id: number;
//   username: string;
//   image: string;
// }

const ProfileComponent: React.FC<any> = ({ userId }) => {

  const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
  const UPLOAD_URL = import.meta.env.VITE_BASE_URL;

  const [userData, setUserData] = useState()
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<any>();
  const [image, setImage] = useState<File | null>(null)
  const [activeTab, setActiveTab] = useState<
    "posts" | "followers" | "following"
  >("posts");

  const logedinUserId =
    JSON.parse(localStorage.getItem("userId") || '""') || "";

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const fetchUserData = async () => {
    const response = await axiosInstance.get(`/user/getUserInfo/${userId}`);
    setUser(response.data.user);
  };

  useEffect(() => {
    fetchUserData();
  }, [userId, userData]);

  const handleEditProfile = async () => {
    setIsModalOpen(true);
    const response = await axiosInstance.get(`/user/getUserInfo/${logedinUserId}`)
    setFirstName(response.data.user.firstName)
    setLastName(response.data.user.lastName)
    setEmail(response.data.user.email)    
    setUserData(response.data.user)
  };

  // const handleUnfollow = () => {
  //   // Logic for unfollowing
  // };

  const renderButton = () => {
    if (logedinUserId === userId) {
      return (
        <button
          className="text-sm text-indigo-500 shadow-lg border-2 border-slate-800 rounded-lg px-5 py-2 mt-4 hover:bg-indigo-500 hover:text-white"
          onClick={handleEditProfile}
        >
          Edit Profile
        </button>
      );
    } else {
      // return (
      //   <button
      //     className="text-sm text-indigo-500 shadow-lg border-2 border-slate-800 rounded-lg px-5 py-2 mt-4 hover:bg-indigo-500 hover:text-white"
      //     onClick={handleUnfollow}
      //   >
      //     Unfollow
      //   </button>
      // );
    }
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];

    if(selectedImage){
      const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg']

      if(allowedFormats.includes(selectedImage.type)){
        setImage(selectedImage)
      }
    }  else {
      toast.error('please select an image')
    }
  }

  const handleImageUpload = async () => {
    try {
      const formData =new FormData();
      if(image){
        formData.append('file', image)
        formData.append('upload_preset', UPLOAD_PRESET);
        formData.append('cloud_name', CLOUD_NAME);

        const response = await axios.post(UPLOAD_URL, formData)
                
        return response.data.secure_url;
      } 
    } catch (error) {
      console.log(error)
    }
  }

  const editProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim() ) {
      setError('All fields are required.');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    setIsModalOpen(false)
    const image = await handleImageUpload();
    const response = await axiosInstance.put('/user/update',{
      firstName,
      lastName,
      image
    })
    setUser(response.data.updated)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "posts":
        return <Posts userId={userId} />;
      case "followers":
        return <Followers userId={userId} setActiveTab={setActiveTab} />;
      case "following":
        return <Following userId={userId} setActiveTab={setActiveTab} />;
      default:
        return null;
    }
  };

  const modalContent = (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
    <div className="bg-black mx-auto mt-20 p-4 flex rounded-lg border-2 border-slate-800">
      <div className="flex-grow">
        <div className="flex justify-end">
          <button
            className="text-3xl cursor-pointer text-white"
            onClick={() => setIsModalOpen(false)}
          >
            &times;
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-4 text-white">Edit Profile</h1>
        <form className='space-y-4' onSubmit={editProfileSubmit}>
          <div className='flex flex-col'>
            <input
              type="text"
              className='py-2 px-3 mb-3 w-full border rounded-md'
              placeholder='First Name'
              name='firstName'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              className='py-2 px-3 mb-3 w-full border rounded-md'
              placeholder='Last Name'
              name='lastName'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="text"
              className='py-2 px-3 w-full mb-3 border rounded-md'
              placeholder='Email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly
            />
            <input
              type='file'
              className='py-2 px-3 mb-3 w-full border rounded-md outline-none border-slate-800 text-white'
              placeholder='Image'
              name='image'
              onChange={handleImage}
              accept='image/*'
              required
            />
          </div>
          <div className='flex flex-col items-center'>
            {error && <p className='text-red-500'>{error}</p>}
            <button type='submit' className='bg-blue-500 text-white py-2 px-4 mt-4 mb-3 rounded-md w-full'>Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );

  return (
    <div className="max-w-4xl mx-auto my-8 h-fit mt-10">
      {/* Top Section */}
      <div className="bg-black p-4 rounded-md border-2 border-slate-800 flex items-center justify-around">
        <div className="w-32 h-32 overflow-hidden rounded-full">
          <img
            src={user?.image? user?.image : profile}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-white">
            {user?.firstName} {user?.lastName}
          </h2>
          <div className="flex space-x-2 text-sm">
            <span className="text-white">
              Followers: {user?.followers?.length}
            </span>
            <span className="text-white">
              Following: {user?.following?.length}
            </span>
          </div>
          <div className="flex justify-center"> {renderButton()} </div>{" "}
        </div>
      </div>

      {/* Bottom Section - Tabs */}
      <div className="flex justify-around mt-4 bg-black p-2  py-4">
        <button
          onClick={() => setActiveTab("posts")}
          className={`text-indigo-500 border-2 border-slate-800 px-20 py-2 rounded-md ${
            activeTab === "posts" && "bg-indigo-500 text-white"
          }`}
        >
          Posts
        </button>
        <button
          onClick={() => setActiveTab("followers")}
          className={`text-indigo-500 border-2 border-slate-800 px-20 py-2 rounded-md ${
            activeTab === "followers" && "bg-indigo-500 text-white"
          }`}
        >
          Followers
        </button>
        <button
          onClick={() => setActiveTab("following")}
          className={`text-indigo-500 border-2 border-slate-800 px-20 py-2 rounded-md ${
            activeTab === "following" && "bg-indigo-500 text-white"
          }`}
        >
          Following
        </button>
      </div>

      {/* Display content based on the active tab */}
      <div className="mt-4 bg-black max-h-72 overflow-y-auto">
        {renderContent()}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          {modalContent}
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
