import React from 'react';
import Navbar from '../../components/user/Header/Navbar';
import LiveAuctions from '../../components/user/LiveAuctions/LiveAuctions';

const App = () => {
  return (
    <>
      <div className='top-0 w-full bg-black text-white p-4 text-center'>
        <Navbar />
      </div>
      <div className="bg-black pb-16"> {/* Add padding-bottom to ensure content is not covered by navbar */}
        <LiveAuctions />
      </div>
    </>
  );
};

export default App;
