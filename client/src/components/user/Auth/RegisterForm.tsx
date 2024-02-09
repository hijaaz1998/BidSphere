import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axiosEndPoints/userAxios';
import { signup } from '../../../slices/userSlice';
import {useDispatch,useSelector} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [error, setError] = useState<string>('');
  const [otp, setOTP] = useState('');
  const [validOtp, setValidOtp] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signupHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!firstName.trim() || !lastName.trim() || !phoneNumber.trim() || !email.trim() || !password.trim() || !otp.trim() || !cpassword.trim()) {
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

    if(otp !== validOtp){
      setError('Incorrect OTP');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    if (password !== cpassword) {
      setError('Passwords do not match.');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    try {
      const response = await axiosInstance.post('/user/signup', {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      })
      
      if(response.data.success){

        toast.success('Registration successfull')
        navigate('/');
        
      } else {
        setError(response.data.result.error.message);
        setTimeout(() => {
          setError('');
        }, 3000);
      }
    } catch (error:any) {
      toast.error(error.response)
    }

  };

  const handleGetOTP = async () => {
    const response = await axiosInstance.post(`/user/get_otp`, email);

    if(response.data.success){
      toast.success(response.data.message)
      setValidOtp(response.data.otp)
    } else {
        setError(response.data.message);
        setTimeout(() => {
            setError('');
        }, 3000);
        return;
    }
  }

  return (
    <>
      <ToastContainer/>
      <div className='relative flex items-center justify-center min-h-screen'>
        <div className='p-8 w-full md:w-96'>
          <h1 className='text-2xl font-bold mb-4'>Sign up</h1>
          <form className='space-y-4' onSubmit={signupHandler}>
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
                type="tel"
                className='py-2 px-3 mb-3 w-full border rounded-md'
                placeholder='Phone Number'
                name='phoneNumber'
                value={phoneNumber}
                onChange={(e) => setPhone(e.target.value)}
                
              />
              <div className='flex justify-center items-center'>
                <input
                  type="text"
                  className='py-2 px-3 w-4/5 mb-3 border rounded-md'
                  placeholder='Email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                  <a className='w-1/5 text-blue-400 cursor-pointer' onClick={handleGetOTP}>Get OTP</a>
              </div>
              {validOtp && 
              <input
                type="text"
                className='py-2 px-3 mb-3 w-full border rounded-md'
                placeholder='OTP'
                name='otp'
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                
              />
              }
              <input
                type="password"
                className='py-2 px-3 mb-3 w-full border rounded-md'
                placeholder='Password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
              />
              <input
                type="password"
                className='py-2 px-3 mb-3 w-full border rounded-md'
                placeholder='Confirm Password'
                name='confirmPassword'
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
                
              />
            </div>
            <div className='flex flex-col items-center'>
              {error && <p className='text-red-500'>{error}</p>}
              <button type='submit' className='bg-blue-500 text-white py-2 px-4 mt-4 mb-3 rounded-md w-full'>Sign Up</button>
              <p className='text-sm mt-2'>Already have an account? <span className='text-blue-500 cursor-pointer'><Link to={'/'} >Login</Link></span></p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
