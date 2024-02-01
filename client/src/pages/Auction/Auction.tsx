import React from 'react';
import Navbar from '../../components/user/Header/Navbar';
import LiveAuctions from '../../components/user/LiveAuctions/LiveAuctions';
const App = () => {
  return (
    <>
      <div className='top-0 w-full bg-gray-800 text-white p-4 text-center'>
        <Navbar />
      </div>
      <div className="container mx-auto  bg-black">
        <LiveAuctions />
      </div>
    </>

  );
};

export default App;
