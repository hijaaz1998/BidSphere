import './Navbar.css';
import logo from '/defaults/logo.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../../slices/adminSlice/adminSlice';

function AdminNavbar() {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        localStorage.removeItem("adminToken");
        dispatch(adminLogout())
        navigate('/admin')
      }
  return (
    <div className='fixed flex items-center justify-between top-0 left-0 w-full bg-gray-800 p-3 z-10 py-6 px-10 h-20'>
      
      <div className='flex items-center'>
        <img src={logo} alt="logo" className='w-40 cursor-pointer ml-4' />
      </div>

      <div className='flex items-center'>
        {/* <div className='flex items-center bg-white rounded-lg'>
          <input
            type="text"
            placeholder='Search'
            className='py-2 bg-transparent border-0 outline-none text-black text-sm max-w-96 w-96 px-2 '
          />
          <img src={search_icon} alt="search_icon" className='w-5 cursor-pointer mx-2' />
        </div> */}
      </div>

      <div className='flex items-center mr-10'>
        <button className='text-white' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default AdminNavbar;
