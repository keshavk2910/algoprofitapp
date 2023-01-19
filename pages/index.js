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
  const [capital, setCapital] = useState(0);
  const [totalProfitPercent, setTotalProfitPercent] = useState(0);
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

  const totalZerodha = apiData.reduce((a, b) => a + Number(b.Zerodha), 0);
  const totalFinvasia = apiData.reduce((a, b) => a + Number(b.Finvasia), 0);
  const totalTotal = apiData.reduce((a, b) => a + Number(b.Total), 0);

  //const for total profit when Total is positive
  const totalProfit = apiData
    .filter((d) => Number(d.Total) > 0)
    .reduce((a, b) => a + Number(b.Total), 0);

  //const for total loss when Total is negative
  const totalLoss = apiData
    .filter((d) => Number(d.Total) < 0)
    .reduce((a, b) => a + Number(b.Total), 0);

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
        ) => apiData.slice(0, i + 1).reduce((a, b) => a + Number(b.Total), 0)
      ),
    },

    {
      type: 'bar',
      label: 'Zerodha',
      data: labelfromapi.map((d, i) => apiData[i].Zerodha),
      backgroundColor: '#ff5722',
      stack: 'Stack 0',
    },
    {
      label: 'Finvasia',
      data: labelfromapi.map((d, i) => apiData[i].Finvasia),
      backgroundColor: '#990055',
      stack: 'Stack 0',
    },
    {
      label: 'Total',
      data: labelfromapi.map((d, i) => apiData[i].Total),
      backgroundColor: '#000',
      stack: 'Stack 0',
    },
  ];
  console.log(datasetsFromAPi);
  const data = {
    labels: labelfromapi,
    datasets: datasetsFromAPi,
  };
  const LinkLI = 'text-blue-500 hover:text-blue-800';
  const handleCapital = (e) => {
    setCapital(e.target.value);
  };
  const handleCalculate = () => {
    //calculate total profit is what % of capital
    const totalProfitPercent = (totalTotal / capital) * 100;
    const totalProfitPercentRound = totalProfitPercent.toFixed(2);
    setTotalProfitPercent(totalProfitPercentRound);
  };

  return (
    <div className='container m-auto'>
      <h1 className='text-4xl font-bold mb-10 mt-10 text-center'>
        Algorithmic Trading Results - Keshav
      </h1>
      <div className='w-1/2 m-auto '>
        <ul className='flex justify-between w-full'>
          <li className={LinkLI}>
            <Link href='/'>Keshav</Link>{' '}
          </li>

          <li className={LinkLI}>
            <Link href='/deepak'>Deepak</Link>
          </li>
        </ul>
      </div>
      <div className='w-full text-center'>
        <input
          type='number'
          className='border-2 p-2 mb-2'
          onChange={handleCapital}
        />
        <button className='border-2 border-black p-2' onClick={handleCalculate}>
          Calculate
        </button>
        {totalProfitPercent !== 0 && (
          <div
            className={
              totalProfitPercent > 0
                ? 'flex flex-col justify-center items-center p-2 bg-green-200'
                : 'flex flex-col justify-center items-center p-2 bg-red-200'
            }
          >
            Total Profit is {totalProfitPercent} % of capital
          </div>
        )}
      </div>
      <div className='w-[95vw] md:w-1/2  md:m-auto m-2 border-2 border-black h-[500px] overflow-auto'>
        <table className='table-auto w-full  border-collapse border border-gray-400 m-auto'>
          <thead>
            <tr>
              <th className='border border-gray-400'>Day</th>
              <th className='border border-gray-400'>Date</th>
              <th className='border border-gray-400'>Zerodha</th>
              <th className='border border-gray-400'>Finvasia</th>
              <th className='border border-gray-400'>Total</th>
              <th className='border border-gray-400'>Profit or Loss</th>
            </tr>
          </thead>
          <tbody>
            {apiData.map((d, i) => (
              <tr
                key={i}
                className={i % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}
              >
                <td className='border border-gray-400'>{i + 1}</td>
                <td className='border border-gray-400'>{d.Date}</td>
                <td className='border border-gray-400'>{d.Zerodha}</td>
                <td className='border border-gray-400'>{d.Finvasia}</td>
                <td className='border border-gray-400'>{d.Total}</td>
                <td
                  className={
                    Number(d.Total) > 0
                      ? 'border border-gray-400 bg-green-200'
                      : 'border border-gray-400 bg-red-200'
                  }
                >
                  {Number(d.Total) > 0 ? 'Profit' : 'Loss'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex md:justify-between flex-wrap	mt-10 border p-5 max-w-[100%]'>
        <div
          className={
            totalZerodha > 0
              ? 'flex flex-col justify-center items-center p-2 bg-green-200'
              : 'flex flex-col justify-center items-center p-2 bg-red-200'
          }
        >
          <div className='text-center'>Total Zerodha</div>
          <div className='text-center'>{totalZerodha}</div>
        </div>
        <div
          className={
            totalFinvasia > 0
              ? 'flex flex-col justify-center items-center p-2 bg-green-200'
              : 'flex flex-col justify-center items-center p-2 bg-red-200'
          }
        >
          <div className='text-center'>Total Finvasia</div>
          <div className='text-center'>{totalFinvasia}</div>
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
            {(
              (apiData.filter((d) => Number(d.Total) > 0).length /
                apiData.length) *
              100
            ).toFixed(2)}
          </div>
        </div>
        <div className='flex flex-col justify-center items-center bg-yellow-200 p-2'>
          <div className='text-center'>Profits Total</div>
          <div className='text-center'>{totalProfit}</div>
        </div>

        <div className='flex flex-col justify-center items-center bg-red-200 p-2 '>
          <div className='text-center'>Loss Days %</div>
          <div className='text-center'>
            {(
              (apiData.filter((d) => Number(d.Total) < 0).length /
                apiData.length) *
              100
            ).toFixed(2)}
          </div>
        </div>
        <div className='flex flex-col justify-center items-center bg-yellow-200 p-2'>
          <div className='text-center'>Loss Total</div>
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
  const res = await fetch('https://algoprofitapp.vercel.app/api/sheet');
  const datafromapi = await res.json();

  return {
    props: {
      dataAPI: datafromapi,
    },
  };
}
