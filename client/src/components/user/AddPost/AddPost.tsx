import React, { useState, ChangeEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import axiosInstance from '../../../axiosEndPoints/userAxios';
import { useNavigate } from 'react-router-dom';

interface AddPostProps {
  setSelectedComponent : (str : string) => void;
}

const AddPost : React.FC<AddPostProps> = ({setSelectedComponent}) => {

  const navigate = useNavigate();

  const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
  const UPLOAD_URL = import.meta.env.VITE_BASE_URL;

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [age, setAge] = useState('');
  const [condition, setCondition] = useState('');
  const [rarity, setRarity] = useState('');
  const [image, setImage] = useState<File | null>(null)

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];    

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
        
        return response.data.secure_url;
      } 
    } catch (error) {
      console.log(error)
    }
  }

  

  const addProductHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const image = await handleImageUpload();

    const response = await axiosInstance.post('/product/addProduct', {
      data: {
        productName,
        description,
        age,
        condition,
        rarity,
        image
      },
    })
    
    if(response){
      toast.success("added");
      setSelectedComponent('myPost');
      navigate('/')
    }
  }

  return (
    <>
  <ToastContainer />
  <div className='bg-black w-full flex items-center justify-center min-h-screen h-full'>
    <div className='mt-20 p-8 w-[800px] md:w-96 lg:w-1/2 bg-black rounded-lg text-center border-2 border-slate-800'>
      <h1 className='text-2xl font-medium mb-4 text-white'>Add Post</h1>
      <form className='space-y-4' onSubmit={addProductHandler}>
        <div className='flex flex-col'>
          <input
            type='text'
            className='py-2 px-3 mb-3 w-full border rounded-md outline-none border-slate-800 bg-black text-white' 
            placeholder='Product Name'
            name='productName'
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          
          <textarea
            className='py-2 px-3 mb-3 w-full border rounded-md outline-none border-slate-800 bg-black text-white'
            placeholder='Description'
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type='text'
            className='py-2 px-3 mb-3 w-full border rounded-md outline-none border-slate-800 bg-black text-white'
            placeholder='Age'
            name='age'
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <input
            type='text'
            className='py-2 px-3 mb-3 w-full border rounded-md outline-none border-slate-800 bg-black text-white'
            placeholder='Condition'
            name='condition'
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          />
          <input
            type='text'
            className='py-2 px-3 mb-3 w-full border rounded-md outline-none border-slate-800 bg-black text-white'
            placeholder='Rarity'
            name='rarity'
            value={rarity}
            onChange={(e) => setRarity(e.target.value)}
            required
          />
          <label htmlFor='image' className='block mb-2 text-white'>
            Upload Image:
          </label>
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
