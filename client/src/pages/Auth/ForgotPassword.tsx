import React, { FormEvent, useState } from 'react'
import axiosInstance from '../../axiosEndPoints/userAxios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

  const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [otp, setOtp] = useState()
    const [error, setError] = useState<string>('')
    const [validOtp, setValidOtp] = useState()

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {

      e.preventDefault();

      if (!email || !otp || !password || !cpassword) {
        setError('All fields must be filled out');
        setTimeout(() => {
          setError('');
        }, 3000);
        return;
      }

      if (!otp || isNaN(otp) || parseInt(otp) !== validOtp) {
        setError('Invalid OTP');
        setTimeout(() => {
          setError('');
        }, 3000);
        return;
      }
    
      if (!password || !cpassword) {
        setError('Password fields cannot be empty');
        setTimeout(() => {
          setError('');
        }, 3000);
        return;
      }
    
      if (password !== cpassword) {
        setError('Passwords do not match');
        setTimeout(() => {
          setError('');
        }, 3000);
        return;
      }

      await axiosInstance.post(`/user/set_new_password`,{email, password}).then((response) => {
        toast.success('password changed successfully');
        navigate('/');
        
      })
        
    }

    const handleGetOTP = async () => {
        const response = await axiosInstance.post('/user/get_otp', email);

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
      <div className='relative flex items-center justify-center min-h-screen'>
        <div className='p-8 w-full md:w-96'>
          <h1 className='text-2xl font-bold mb-4'>Recover your acoount</h1>
          <h3 className='text-sm text-gray-600 mb-6'></h3>
          <form onSubmit={(e) => submitHandler(e)} className='space-y-4'>
            <div className='flex flex-col'>
              <div className='flex mb-3'>
                <input
                  type='text'
                  className='py-2 px-3 w-full border rounded-md mr-2'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                {/* Change the button to a link */}
                <a
                  href='#'
                  className='text-blue-300 underline cursor-pointer'
                  onClick={(e) => {
                    e.preventDefault();
                    handleGetOTP();
                  }}
                >
                  Get OTP
                </a>
              </div>
              <input
                type='text'
                className='py-2 px-3 mb-3 w-full border rounded-md'
                placeholder='Enter OTP'
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              />
              <input
                type='password'
                className='py-2 px-3 mb-3 w-full border rounded-md'
                placeholder='Password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <input
                type='password'
                className='py-2 px-3 mb-3 w-full border rounded-md'
                placeholder='Confirm Password'
                value={cpassword}
                onChange={(e) => {
                  setCpassword(e.target.value);
                }}
              />
            </div>
            <div className='flex flex-col items-center'>
              {error && <p className='text-red-500'>{error}</p>}
              <button type='submit' className='bg-blue-500 text-white py-2 px-4 mt-4 mb-3 rounded-md w-full'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword