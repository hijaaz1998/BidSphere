import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../../axiosEndPoints/userAxios';
import Pagination from '../../../Pagination/Pagination';
import { toast } from 'react-toastify';

const Income = () => {

    const [IncomeData, setIncomeData] = useState<any[]>([]);
    const [update, setUpdate] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5)

    const fetchData = async () => {
        const response = await axiosInstance.get('/admin/get_income')
        setIncomeData(response.data.incomes)
        console.log("income",response.data.incomes);
        
    }

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = IncomeData.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(IncomeData.length / recordsPerPage);

    const handleApprove = async (paymentId: string) => {
        const response = await axiosInstance.put(`/admin/approve_auction/${paymentId}`)
        setIncomeData(response.data.updated)
        toast.success(response.data.message)
      }

    useEffect(() => {
        fetchData();
    },[])

  return (
    <>
        <div className='top-28 ml-96 mt-32'>
        {currentRecords.map((data) => (
            <div key={data.id} className="border rounded p-4 mb-4 shadow-md flex items-center">
            <img
                src={data?.auctionId?.postId?.image}
                alt={`Auctioned ${data?.auctionId?.postId?.productName}`}
                className="w-16 h-16 mr-4"
            />
            <div className="flex flex-col flex-grow">
                <h2 className="text-lg font-bold mb-2">{data?.auctionId?.postId?.productName}</h2>
                <div className="flex items-center">
                <p className="flex-grow mr-4 text-pretty text-lg">Current Amount: {data?.auctionId.currentAmount}</p>
                <button
                    onClick={() => handleApprove(data?._id)}
                    className={`py-2 px-4 rounded focus:outline-none  h-10 ${
                    data?.isConfirmed
                        ? 'bg-blue-500 text-white'
                        : 'bg-green-500 text-white'
                    }`}
                >
                    {data?.isConfirmed ? 'Approved' : 'Approve Now'}
                </button>
                </div>
            </div>
            </div>
        ))}
        </div>
        <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
        />
    </>
  )
}

export default Income