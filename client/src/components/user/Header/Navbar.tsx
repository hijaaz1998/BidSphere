import './Navbar.css';
import logo from '/defaults/logo.png';
import default_profile from '/defaults/blank_profile.png';
import search_icon from '/defaults/search-b.png';

function Navbar() {
  return (
    <div className='fixed items-center flex top-0 left-0 w-full bg-gray-900 p-3 z-10'>
      <img src={logo} alt="logo" className='w-40 cursor-pointer' />

      <ul className='flex items-center justify-center'>
        <li className='text-white mx-4 cursor-pointer'>Home</li>
        <li className='text-white mx-4 cursor-pointer'>Auctions</li>
      </ul>

      <div className='flex items-center p-2 bg-white rounded-full'>
        <input
          type="text"
          placeholder='Search'
          className='p-1 bg-transparent border-0 outline-none text-black text-sm max-w-40'
        />
        <img src={search_icon} alt="search_icon" className='w-5 cursor-pointer' />
      </div>

      <img
        src={default_profile}
        alt="profile"
        className='w-8 h-8 cursor-pointer ml-4 rounded-full overflow-hidden'
      />
    </div>
  );
}

export default Navbar;
