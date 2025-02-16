'use client';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

interface IPieChart {
    expense: number;
    income: number
}

export default function PieChart(
    props: IPieChart
) {
    return (
    <Pie
        height="300px"
        data={{
            labels: ['Expense', 'Income'],
            datasets: [
                {
                    datalabels: {
                        color: '#000000'
                    },
                    data: [props.expense, props.income - props.expense],
                    backgroundColor: [
                        'rgb(221, 233, 91)',
                        'rgba(75, 192, 192, 1)',
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        }}
    />)
}