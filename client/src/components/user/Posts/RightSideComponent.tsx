import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axiosEndPoints/userAxios';
import { toast } from 'react-toastify';
import axios from 'axios';

interface PostId {
  postId: string | undefined
}

const RightSideComponent: React.FC<PostId> = ({ postId }) => {
  const navigate = useNavigate();
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [age, setAge] = useState('');
  const [condition, setCondition] = useState('');
  const [rarity, setRarity] = useState('');
  const [id, setId] = useState('');

  const handleRemoveButtonClick = () => {
    setRemoveModalOpen(true);
  };

  const handleEditButtonClick = async (postId: string) => {
    const response = await axiosInstance.get(`/product/postDetails/${postId}`)
    const data = response.data;
    setProductName(data?.productName);
    setDescription(data?.description);
    setAge(data?.age);
    setCondition(data?.condition);
    setRarity(data?.rarity);
    setId(data?._id)
    
    setEditModalOpen(true);
  };

  const handleRemoveConfirm = async (postId: string | undefined) => {
    const response = await axiosInstance.patch(`/product/deletePost/${postId}`);
    if (response) {
      toast.success(response.data.message);
    }
    navigate('/home');
    setRemoveModalOpen(false);
  };

  const handleEditConfirm = async (e: React.FormEvent, id: string) => {
    e.preventDefault();

    const res = await axiosInstance.put(`/product/editPost/${id}`, {
      data: {
        productName,
        description,
        age,
        condition,
        rarity,

      }
    });

    toast.success("Updated Successfully")
    
    navigate('/home')

    setEditModalOpen(false);
  };

  const handleRemoveModalClose = () => {
    setRemoveModalOpen(false);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  return (
    <div className="bg-gray-200 p-4 rounded w-full mt-4">
      <div className="flex flex-col space-y-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full" onClick={() => handleEditButtonClick(postId)}>
          Edit
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded w-full" onClick={handleRemoveButtonClick}>
          Remove
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded w-full">Set for Auction</button>
      </div>

      {/* Remove confirmation modal */}
      {isRemoveModalOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50" onClick={handleRemoveModalClose}></div>
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-lg">
              <p className="text-lg font-bold mb-4">Are you sure you want to remove?</p>
              <div className="flex justify-end">
                <button className="bg-gray-300 px-4 py-2 mr-2 rounded" onClick={handleRemoveModalClose}>
                  Cancel
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleRemoveConfirm(postId)}>
                  Confirm Remove
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edit modal */}
      {isEditModalOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50" onClick={handleEditModalClose}></div>
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-lg">
              <form className="space-y-4" onSubmit={(e) => handleEditConfirm(e, id)}>
                <input
                  type="text"
                  className="py-2 px-3 mb-3 w-full border rounded-md"
                  placeholder="Product Name"
                  name="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
                <textarea
                  className="py-2 px-3 mb-3 w-full border rounded-md"
                  placeholder="Description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="py-2 px-3 mb-3 w-full border rounded-md"
                  placeholder="Age"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="py-2 px-3 mb-3 w-full border rounded-md"
                  placeholder="Condition"
                  name="condition"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="py-2 px-3 mb-3 w-full border rounded-md"
                  placeholder="Rarity"
                  name="rarity"
                  value={rarity}
                  onChange={(e) => setRarity(e.target.value)}
                  required
                />
                {/* Add your additional form fields for editing */}
                <div className="flex justify-end">
                  <button className="bg-gray-300 px-4 py-2 mr-2 rounded" onClick={handleEditModalClose}>
                    Cancel
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RightSideComponent;
