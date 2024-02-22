import React from 'react'
import Navbar from "../../components/user/Header/Navbar"
import AuctionDetailsComponent from '../../components/user/LiveAuctions/AuctionDetailsComponent'
import { useParams } from 'react-router-dom'



const AuctionDetailsPage = () => {

  const { auctionId } = useParams();
  return (
    <div className='h-full'>
      <div className=" top-0 w-full bg-black text-white p-4 text-center">
        <Navbar />
      </div>
      <div className='mt-9 bg-black'>
        <AuctionDetailsComponent auctionId = {auctionId} />
      </div>
    </div>
  )
}

export default AuctionDetailsPage