import React, { useEffect, useState } from 'react';
import image from '../../assets/User Avatar Vector Design Images, User Vector Avatar, Human Clipart, Female User, Icon PNG Image For Free Download.jpg';
import axiosInstance from '../../../../axiosEndPoints/userAxios';
import { useNavigate } from 'react-router-dom';

const UserMgt = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState<any[]>([])
  const [update, setUpdate] = useState(false)

  const fetchUsers = async () => {
    const response = await axiosInstance.get('/admin/users');
    setUsers(response.data.result);
  }

  const blockUser = async (userId: string) => {
    try {
      console.log("sending req");
      
      const response = await axiosInstance.patch(`/admin/block_user/${userId}`);
      if(response.data.message){
        console.log(response.data.message);
        
        setUpdate((previous) => !previous);
      }

    } catch (error) {
      console.error('Error blocking user:', error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [update])

  return (
    <div className='top-28 ml-96 mt-32'>
      {users.map((user) => (
        <div key={user._id} className="border rounded p-4 mb-4 shadow-md flex items-center">
          <img
            src={image}
            alt={user.name}
            className="w-16 h-16 rounded-full mr-4"
          />
          <div className="flex-grow">
            <h2 className="text-lg font-bold">{`${user?.firstName} ${user?.lastName}`}</h2>
          </div>
          <button
            onClick={() => blockUser(user._id)}
            className={`py-2 px-4 rounded focus:outline-none ${
              user.isBlocked
                ? 'bg-green-500  text-white'
                : 'bg-red-500  text-white'
            }`}
          >
            {user.isBlocked ? 'Unblock' : 'Block'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default UserMgt;
