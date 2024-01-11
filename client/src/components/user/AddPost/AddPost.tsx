import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPost = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [age, setAge] = useState('');
  const [rarity, setRarity] = useState('');
  const [condition, setCondition] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const [error, setError] = useState<string>('');

  const signupHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Your form submission logic here

    toast.success('Post added successfully');
  };

  return (
    <>
      <ToastContainer />
      <div className='bg-gray-400 w-full flex items-center justify-center min-h-screen'>
        <div className='mt-20 p-8 w-full md:w-96 lg:w-1/2 bg-white rounded-lg text-center'>
          <h1 className='text-2xl font-bold mb-4'>Add Post</h1>
          <form className='space-y-4' onSubmit={signupHandler}>
            <div className='flex flex-col'>
              <input
                type='text'
                className='py-2 px-3 mb-3 w-full border rounded-md'
                placeholder='Product Name'
                name='productName'
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
              <textarea
                className='py-2 px-3 mb-3 w-full border rounded-md'
                placeholder='Description'
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              ></textarea>
              <div className='flex space-x-4'>
                <input
                  type='number'
                  className='py-2 px-3 mb-3 w-1/2 border rounded-md'
                  placeholder='Age'
                  name='age'
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
                <input
                  type='text'
                  className='py-2 px-3 mb-3 w-1/2 border rounded-md'
                  placeholder='Rarity'
                  name='rarity'
                  value={rarity}
                  onChange={(e) => setRarity(e.target.value)}
                  required
                />
              </div>
              <input
                type='text'
                className='py-2 px-3 mb-3 w-full border rounded-md'
                placeholder='Condition'
                name='condition'
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                required
              />
              <label htmlFor='image' className='block mb-2 text-gray-600'>
                Upload Image:
              </label>
              <input
                type='file'
                className='py-2 px-3 mb-3 w-full border rounded-md'
                placeholder='Image'
                name='image'
                onChange={(e) => setImage(e.target.files && e.target.files[0])}
                accept='image/*'
                required
              />
            </div>
            <div className='flex flex-col items-center'>
              {error && <p className='text-red-500'>{error}</p>}
              <button
                type='submit'
                className='bg-blue-500 text-white py-2 px-4 mt-4 mb-3 rounded-md w-full'
              >
                Add Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPost;
