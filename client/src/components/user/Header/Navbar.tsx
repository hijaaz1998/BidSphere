import logo from '/defaults/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../slices/userSlice';

function Navbar() {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogout = async () => {

    dispatch(logout())
    navigate('/')
  }

  return (
    <div className='fixed flex flex-col md:flex-row items-center justify-between top-0 left-0 w-full bg-black p-3 z-10 px-9 border-b border-indigo-500'>
      <div className="flex items-center">
        <Link to={'/'}>
          <img src={logo} alt="logo" className='w-40 cursor-pointer' />
        </Link>
      </div>

      <div className='flex items-center md:ml-4 mt-4 md:mt-0'>
        <ul className='flex items-center font-sans justify-between'>
          <li className='mr-4 md:mr-12'><Link to={'/'}>Home</Link></li>
          <li className='md:mr-12'><Link to={'/auctions'}>Auctions</Link> </li>
        </ul>
        <div className='drop-shadow-2xl overflow-hidden shadow-lg border-2 border-slate-800 rounded-xl ml-4 md:ml-0'>
          <button
            onClick={handleLogout}
            className='text-indigo-500 text-s py-2 px-3 cursor-pointer hover:bg-indigo-500 hover:text-white'
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
