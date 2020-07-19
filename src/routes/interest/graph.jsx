import React from 'react';

// Components
// import { Field } from '/components/field';
import { Line } from 'react-chartjs-2';

// const graphData = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
// datasets: [
//     {
//         label: 'My First dataset',
//         fill: false,
//         lineTension: 0.1,
//         backgroundColor: 'rgba(75,192,192,0.4)',
//         borderColor: 'rgba(75,192,192,1)',
//         borderCapStyle: 'butt',
//         borderDash: [],
//         borderDashOffset: 0.0,
//         borderJoinStyle: 'miter',
//         pointBorderColor: 'rgba(75,192,192,1)',
//         pointBackgroundColor: '#fff',
//         pointBorderWidth: 1,
//         pointHoverRadius: 5,
//         pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//         pointHoverBorderColor: 'rgba(220,220,220,1)',
//         pointHoverBorderWidth: 2,
//         pointRadius: 1,
//         pointHitRadius: 10,
//         data: [65, 59, 80, 81, 56, 55, 40],
//     },
// ],
// };

export const PaymentsGraph = ({ data }) => {
    console.log('graph: ', data);

    const graphData = {
        labels: data.map((p) => p.dateString),
        datasets: [
            {
                label: 'Remaining Balance',
                lineTension: 0.1,
                backgroundColor: 'hsla(171, 100%, 41%, 0.4)',
                borderColor: 'hsla(171, 100%, 41%, 1)',
                borderCapStyle: 'butt',
                pointBorderColor: 'hsla(171, 100%, 41%, 1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointRadius: 1,
                pointHitRadius: 10,
                data: data.map((p) => p.remainingBalance),
            },
            {
                label: 'Interest Paid to Date',
                lineTension: 0.1,
                backgroundColor: 'hsla(348, 100%, 61%, .4)',
                borderColor: 'hsla(348, 100%, 61%, 1)',
                borderCapStyle: 'butt',
                pointBorderColor: 'hsla(348, 100%, 61%, 1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointRadius: 1,
                pointHitRadius: 10,
                data: data.map((p) => p.interestPaidToDate),
            },
        ],
    };

    return (
        <div className="line-graph">
            <Line data={graphData} />
        </div>
    );
};
