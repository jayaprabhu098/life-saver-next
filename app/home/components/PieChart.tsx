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
                        color: '#ffffff',
                        font: {
                            weight: 'bold',
                            size: 13
                        }
                    },
                    data: [props.expense, Math.max(0, props.income - props.expense)],
                    backgroundColor: [
                        '#ef4444',
                        '#10b981',
                    ],
                    borderColor: 'transparent',
                    borderWidth: 0,
                },
            ],
        }}
        options={{
            plugins: {
                legend: {
                    labels: {
                        color: 'var(--foreground)',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            }
        }}
    />)
}