import React from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { ClipLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';

interface HistoricalData {
  cases: Record<string, number>;
  deaths: Record<string, number>;
  recovered: Record<string, number>;
}

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const fetchHistoricalData = async (): Promise<HistoricalData> => {
  const response = await axios.get<HistoricalData>(`${import.meta.env.VITE_API_URL}/historical/all?lastdays=all`);
  return response.data;
};

const CasesLineGraph: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['historicalData'],
    queryFn: fetchHistoricalData,
  });

  if (isLoading) return <div className='flex justify-center'><ClipLoader /></div>;
  if (isError || !data) return <p>No data available</p>;

  const chartData: ChartData<'line'> = {
    labels: Object.keys(data.cases),
    datasets: [
      {
        label: 'Cases',
        data: Object.values(data.cases),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
      {
        label: 'Deaths',
        data: Object.values(data.deaths),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
      },
      {
        label: 'Recovered',
        data: Object.values(data.recovered),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 16, // Increase the size of the X axis title
            weight: 'bold',
          },
        },
        ticks: {
          maxTicksLimit: 25,
          autoSkip: true,
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Cases',
          font: {
            size: 16, // Increase the size of the Y axis title
            weight: 'bold',
          },
        },
        min: 0,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  };

  return (
    <div className="w-full h-[50vh] md:h-[70vh] p-6">
      <h2 className='text-4xl font-bold'>COVID-19 Cases Fluctuations</h2>
      <Line data={chartData} options={options} id="cases-line-graph-canvas" className='py-6' />
    </div>
  );
};

export default CasesLineGraph;
