import { Pagination } from 'antd';
import { useEffect, useState } from 'react'
import axiosInstance from '../../../../axiosEndPoints/userAxios';

const Reports = () => {

    const [Reports, setReports] = useState<any[]>([]);
    const [update, setUpdate] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5)

    const fetchReports = async () => {
        const response = await axiosInstance.get('/admin/get_reports')
        console.log("reports", response.data.reports)
        setReports(response.data.reports)
    }

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = Reports.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(Reports.length / recordsPerPage);

    useEffect(() => {
        fetchReports();
    },[])

  return (
    <div>
         <div className='top-28 ml-96 mt-32'>
        {currentRecords.map((report) => (
            <div key={report.id} className="border rounded p-4 mb-4 shadow-md flex items-center">
            <img
                src={report.ReportedPost.image}
                alt={report.ReportedPost.productName}
                className="w-16 h-16 mr-4"
            />
            <div className="flex flex-col flex-grow">
                <h2 className="text-lg font-bold mb-2">{report.ReportedPost.productName}</h2>
                <div className="flex items-center">
                {/* <p className="flex-grow mr-4 text-pretty text-lg">Current Amount: {auction.currentAmount}</p>
                <button
                    onClick={() => handleBlockAuction(auction?._id)}
                    className={`py-2 px-4 rounded focus:outline-none w-24 h-10 ${
                    auction.isBlocked
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                >
                    {auction.isBlocked ? 'Unblock' : 'Block'}
                </button> */}
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
    </div>
  )
}

export default Reports