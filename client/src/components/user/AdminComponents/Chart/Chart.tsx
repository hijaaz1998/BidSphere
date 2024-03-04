    import React from 'react';
    import { Line } from 'react-chartjs-2';

    interface ChartProps {
    weeklyData: number[];
    }

    const Chart: React.FC<ChartProps> = ({ weeklyData }) => {
        console.log("weekly",weeklyData);
        
    const labels = weeklyData.map((_, index) => `Week ${index + 1}`);
    console.log("labels",labels)
    console.log("type of labels",typeof labels)
    
    const data = {
        labels,
        datasets: [
        {
            label: 'Auctions per Week',
            data: weeklyData,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                type: 'category',
                labels: labels,
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Auctions per Week',
            },
        },
    };
    

    return <Line options={options} data={data} />;
    };

    export default Chart;
