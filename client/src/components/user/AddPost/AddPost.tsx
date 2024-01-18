import React, { useState, FormEvent, ChangeEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import axiosInstance from '../../../axiosEndPoints/userAxios';
import { useNavigate } from 'react-router-dom';
import { render } from 'react-dom';

interface AddPostProps {
  setSelectedComponent : (str : string) => void;
}

const AddPost : React.FC<AddPostProps> = ({setSelectedComponent}) => {

  const navigate = useNavigate();

  const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
  const UPLOAD_URL = import.meta.env.VITE_BASE_URL;

  const [productName, setProductName] = useState('');
  const [image, setImage] = useState<File | null>(null)

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    console.log(e.target.files?.[0]);
    

    if(selectedFile){
      const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg']

      if(allowedFormats.includes(selectedFile.type)){
        setImage(selectedFile);
      } 
    }
    else{
      toast.error("please select an image")
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
        console.log("aaaa",response.data.secure_url);
        
        return response.data.secure_url;
      } 
    } catch (error) {
      console.log(error)
    }
  }

  

  const addProductHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();



    const image = await handleImageUpload();
    const userId = localStorage.getItem('userId')? JSON.parse(localStorage.getItem('userId') as string): null

    const response = await axiosInstance.post('/product/addProduct', {
      productName,
      image,
      userId
    })
    
    if(response){
      toast.success("added");
      setSelectedComponent('myPost');
      navigate('/home/myPost')
    }


  }

  return (
    <>
      <ToastContainer />
      <div className='bg-gray-400 w-full flex items-center justify-center min-h-screen h-full'>
        <div className='mt-20 p-8 w-[800px] md:w-96 lg:w-1/2 bg-white rounded-lg text-center'>
          <h1 className='text-2xl font-bold mb-4'>Add Post</h1>
          <form className='space-y-4' onSubmit={addProductHandler}>
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
              <label htmlFor='image' className='block mb-2 text-gray-600'>
                Upload Image:
              </label>
              <input
                type='file'
                className='py-2 px-3 mb-3 w-full border rounded-md'
                placeholder='Image'
                name='image'
                onChange={handleImage}
                accept='image/*'
                required
              />
            </div>
            <div className='flex flex-col items-center'>
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
