import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  LineController,
  BarController,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
// import { Bar } from 'react-chartjs-2';

export default function Home({ dataAPI }) {
  const [chartData, setChartData] = useState({});
  const [apiData, setApiData] = useState(dataAPI);

  ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
  );

  const options = {
    plugins: {
      title: {
        display: false,
        text: 'Algorithmic Trading Results',
      },
    },
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const labelfromapi = apiData.map((d) => d.Date);

  const totalHDFC = apiData.reduce((a, b) => a + Number(b.HDFC), 0);
  const totalTotal = apiData.reduce((a, b) => a + Number(b.HDFC), 0);

  const totalProfit = apiData
    .filter((d) => Number(d.HDFC) > 0)
    .reduce((a, b) => a + Number(b.HDFC), 0);

  //const for total loss when Total is negative
  const totalLoss = apiData
    .filter((d) => Number(d.HDFC) < 0)
    .reduce((a, b) => a + Number(b.HDFC), 0);

  const datasetsFromAPi = [
    {
      type: 'line',
      label: 'Total Line',
      borderColor: totalTotal > 0 ? 'green' : 'red',
      borderWidth: 5,
      fill: false,
      data: labelfromapi.map(
        (
          d,
          i //total till this index
        ) => apiData.slice(0, i + 1).reduce((a, b) => a + Number(b.HDFC), 0)
      ),
    },

    {
      type: 'bar',
      label: 'HDFC',
      data: labelfromapi.map((d, i) => apiData[i].HDFC),
      backgroundColor: '#004C8F',
      stack: 'Stack 0',
    },
  ];
  const data = {
    labels: labelfromapi,
    datasets: datasetsFromAPi,
  };
  const LinkLI = 'text-blue-500 hover:text-blue-800';
  return (
    <div className='container m-auto'>
      <h1 className='text-4xl font-bold mb-10 mt-10 text-center'>
        Algorithmic Trading Results
      </h1>
      <div className='w-1/2 m-auto '>
        <ul className='flex justify-between w-full'>
          <li className={LinkLI}>
            <Link href='/'>Home</Link>{' '}
          </li>
          <li className={LinkLI}>
            <Link href='/keshav'>Keshav</Link>{' '}
          </li>
          <li className={LinkLI}>
            <Link href='/hema'>Hema</Link>
          </li>
        </ul>
      </div>
      <div className='w-1/2 m-auto'>
        <table className='table-auto w-full border-collapse border border-gray-400 m-auto'>
          <thead>
            <tr>
              <th className='border border-gray-400'>Date</th>
              <th className='border border-gray-400'>HDFC</th>
              <th className='border border-gray-400'>Profit or Loss</th>
            </tr>
          </thead>
          <tbody>
            {apiData.map((d, i) => (
              <tr
                key={i}
                className={i % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}
              >
                <td className='border border-gray-400'>{d.Date}</td>
                <td className='border border-gray-400'>{d.HDFC}</td>
                <td
                  className={
                    Number(d.HDFC) > 0
                      ? 'border border-gray-400 bg-green-200'
                      : 'border border-gray-400 bg-red-200'
                  }
                >
                  {Number(d.HDFC) > 0 ? 'Profit' : 'Loss'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-between mt-10 border p-5'>
        <div
          className={
            totalHDFC > 0
              ? 'flex flex-col justify-center items-center p-2 bg-green-200'
              : 'flex flex-col justify-center items-center p-2 bg-red-200'
          }
        >
          <div className='text-center'>Total HDFC</div>
          <div className='text-center'>{totalHDFC}</div>
        </div>

        <div
          className={
            totalTotal > 0
              ? 'flex flex-col justify-center items-center p-2 bg-green-200'
              : 'flex flex-col justify-center items-center p-2 bg-red-200'
          }
        >
          <div className='text-center'>Total</div>
          <div className='text-center'>{totalTotal}</div>
        </div>
        <div className='flex flex-col justify-center items-center bg-green-200 p-2'>
          <div className='text-center'>Profit Days %</div>
          <div className='text-center'>
            {(apiData.filter((d) => Number(d.HDFC) > 0).length /
              apiData.length) *
              100}
          </div>
        </div>
        <div className='flex flex-col justify-center items-center bg-yellow-200 p-2'>
          <div className='text-center'>Profits HDFC</div>
          <div className='text-center'>{totalProfit}</div>
        </div>

        <div className='flex flex-col justify-center items-center bg-red-200 p-2 '>
          <div className='text-center'>Loss Days %</div>
          <div className='text-center'>
            {(apiData.filter((d) => Number(d.HDFC) < 0).length /
              apiData.length) *
              100}
          </div>
        </div>
        <div className='flex flex-col justify-center items-center bg-yellow-200 p-2'>
          <div className='text-center'>Loss HDFC</div>
          <div className='text-center'>{totalLoss}</div>
        </div>
      </div>
      <div className='mt-10'>
        <Chart type='bar' data={data} />
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/sheetHema');
  const datafromapi = await res.json();

  return {
    props: {
      dataAPI: datafromapi,
    },
  };
}
