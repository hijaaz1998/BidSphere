import React, { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../../axiosEndPoints/userAxios';
import { useDispatch } from 'react-redux';
import AdminLogin from '../../../pages/Auth/AdminLogin';
import { adminLogin } from '../../../slices/adminSlice/adminSlice';

function AdminLoginForm() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>('')

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    localStorage.removeItem("adminToken");
    navigate('/admin')
  }

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!email.trim() || !password.trim() ){
      setError('All fields are required.');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    if(!emailRegex.test(email)){
      setError('Invalid Email');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    try {
      const response = await axiosInstance.post('/admin/login', {
        email,
        password
      })

      const adminData = response.data;
      
      localStorage.setItem("adminToken", JSON.stringify(adminData.adminToken));
      
      dispatch(adminLogin(adminData))
      navigate('/admin/dashboard')
      
      
    } catch (error) {
      
    }

  }

  return (
    <>
    <div className='relative flex items-center justify-center min-h-screen'>
      <div className='p-8 w-full md:w-96'>
        <h1 className='text-2xl font-bold mb-4'>Sign in</h1>
        <h3 className='text-sm text-gray-600 mb-6'>Enter your details to login.</h3>
        <form onSubmit={loginHandler} className='space-y-4'>
          <div className='flex flex-col'>
            <input type="email" className='py-2 px-3 mb-3 w-full border rounded-md' placeholder='Email' value={email} onChange={(e) => {setEmail(e.target.value)}} />
            <input type="password" className='py-2 px-3 mb-3 w-full border rounded-md' placeholder='Password' value={password} onChange={(e) => {setPassword(e.target.value)}} />
          </div>
          <div className='flex flex-col items-center'>
            {error && <p className='text-red-500'>{error}</p>}
            <button type='submit' className='bg-blue-500 text-white py-2 px-4 mt-4 mb-3 rounded-md w-full'>Login</button>
          </div>
        </form>

        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
    </>
  )
}

export default AdminLoginForm