// Components
import {
  Chart as ChartJS,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
);

const commonGraphProps = {
  tension: 0.1,
  fill: true,
  borderCapStyle: 'butt',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointRadius: 1,
  pointHitRadius: 10,
};

export const PaymentsGraph = ({ data }) => {
  const graphData = {
    labels: data.map((p) => p.dateString),
    datasets: [
      Object.assign({}, commonGraphProps, {
        label: 'Remaining Balance',
        backgroundColor: 'hsla(171, 100%, 41%, 0.4)',
        borderColor: 'hsla(171, 100%, 41%, 1)',
        pointBorderColor: 'hsla(171, 100%, 41%, 1)',
        data: data.map((p) => p.remainingBalance),
      }),
      Object.assign({}, commonGraphProps, {
        label: 'Interest Paid to Date',
        backgroundColor: 'hsla(348, 100%, 61%, .4)',
        borderColor: 'hsla(348, 100%, 61%, 1)',
        pointBorderColor: 'hsla(348, 100%, 61%, 1)',
        data: data.map((p) => p.interestPaidToDate),
      }),
    ],
  };

  return (
    <div className="line-graph">
      <Line data={graphData} />
    </div>
  );
};
