import logo from '/defaults/logo.png';
import default_profile from '/defaults/blank_profile.png';
import searchIcon from '/defaults/search-b.png';
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("userId");
    localStorage.removeItem("userToken");
    navigate('/')
  }

  return (
    <div className='fixed flex items-center justify-between top-0 left-0 w-full bg-gray-800 p-3 z-10 px-9'>
      <div className="flex items-center">
        <img src={logo} alt="logo" className='w-40 cursor-pointer' />
      </div>

      <div className='flex items-center'>
        <ul className='flex items-center mx-auto'>
          <li className='text-white mx-4 cursor-pointer'>Home</li>
          <li className='text-white mx-4 cursor-pointer'>Auctions</li>
        </ul>
      </div>

      <div className='flex items-center'>
        <div className='flex items-center p-2 bg-white rounded-full'>
          <input
            type="text"
            placeholder='Search'
            className='p-1 bg-transparent border-0 outline-none text-black text-sm max-w-40'
          />
          <img src={searchIcon} alt="search_icon" className='w-5 cursor-pointer' />
        </div>

        <button
          onClick={handleLogout}
          className=' text-white p-2 ml-4  cursor-pointer'
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
