import React from 'react'
import Navbar from '../../components/user/Header/Navbar'
import ProfileComponent from '../../components/user/Profile/Profile'

const Profile = () => {
  return (
    <div className='h-full bg-black'>
        <div className='top_0 w-full bg-black text-white p-4 text- bg-center'>
            <Navbar />
        </div>

        <div className='mt-20 bg-black h-screen'>
            <ProfileComponent />
        </div>
    </div>
  )
}

export default Profile