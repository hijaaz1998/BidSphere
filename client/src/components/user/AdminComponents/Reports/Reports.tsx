import Pagination from '../../../Pagination/Pagination';
import { useEffect, useState } from 'react'
import axiosInstance from '../../../../axiosEndPoints/userAxios';
import { ReportedPost } from '../../../../interfaces/Interface';

const Reports = () => {

    const [Reports, setReports] = useState<ReportedPost[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    // const [recordsPerPage, setRecordsPerPage] = useState(5)
    let recordsPerPage = 5;

    const fetchReports = async () => {
        const response = await axiosInstance.get('/admin/get_reports')
        console.log("reports",response.data.reports)

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
            <div key={report._id} className="border rounded p-4 mb-4 shadow-md flex items-center">
            <img
                src={report.ReportedPost.image}
                alt={report.ReportedPost.productName}
                className="w-16 h-16 mr-4"
            />
            <div className="flex flex-col flex-grow">
                <h2 className="text-lg font-bold mb-2">{report.ReportedPost.productName}</h2>
                <div className="flex items-center">
                <p className="flex-grow mr-4 text-pretty text-lg">Issue {report?.issue}</p>
                <p className="flex-grow mr-4 text-pretty text-lg">Reported User: {report?.reportedUser?.firstName}</p>
                
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