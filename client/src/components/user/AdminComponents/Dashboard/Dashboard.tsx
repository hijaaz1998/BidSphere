import React, { useEffect, useState } from 'react';
import Chart from '../Chart/Chart'; // Update the path accordingly
import axiosInstance from '../../../../axiosEndPoints/userAxios'; // Update the path accordingly

const Dashboard: React.FC = () => {
  const [auctionData, setAuctionData] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/admin/dashboard');
      const weeklyData = response.data.payments;
     
      console.log("data", weeklyData);
      
      setAuctionData(weeklyData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='top-28 ml-96 mt-32'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Chart weeklyData={auctionData} />
      )}
    </div>
  );
};
    
export default Dashboard;
