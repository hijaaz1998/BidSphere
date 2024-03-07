import Navbar from '../../components/user/Header/Navbar'
import ProfileComponent from '../../components/user/Profile/Profile'
import { useParams } from 'react-router-dom'

const Profile = () => {

  const {userId} = useParams();

  return (
    <div className='h-full bg-black'>
        <div className='top_0 w-full bg-black text-white p-4 text- bg-center'>
            <Navbar />
        </div>

        <div className='mt-20 bg-black h-screen'>
            <ProfileComponent userId={userId} />
        </div>
    </div>
  )
}

export default Profile