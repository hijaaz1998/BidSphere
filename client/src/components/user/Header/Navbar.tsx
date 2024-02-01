import logo from '/defaults/logo.png';
import default_profile from '/defaults/blank_profile.png';
import searchIcon from '/defaults/search-b.png';
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
    <div className='fixed flex items-center justify-between top-0 left-0 w-full bg-black p-3 z-10 px-9 border-b border-indigo-500'>
      <div className="flex items-center">
        <Link to={'/'}>
          <img src={logo} alt="logo" className='w-40 cursor-pointer' />
        </Link>
      </div>

      <div className='flex items-center p-2 bg-black rounded-xl w-80 drop-shadow-2xl overflow-hidden shadow-lg border-2 border-slate-800'>
          <input
            type="text"
            placeholder='Search'
            className='p-1 bg-transparent border-0 outline-none text-white text-sm w-full'
          />
          <img src={searchIcon} alt="search_icon" className='w-5 cursor-pointer' />
      </div>

      <div className='w-96'>

      </div>

      <div className='flex items-center '>
        <div className='flex items-center mr-20 '>
          <ul className='flex items-center mx-auto font-sans justify-between'>
            <li className='mr-12'><Link to={'/'}>Home</Link></li>
            <li className=''><Link to={'/auctions'}>Auctions</Link> </li>
          </ul>
        </div>

        <div className='drop-shadow-2xl overflow-hidden shadow-lg border-2 border-slate-800 rounded-xl'>
          <button
            onClick={handleLogout}
            className=' text-indigo-500 text-s py-2 px-3 cursor-pointer hover:bg-indigo-500 hover:text-white'
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
