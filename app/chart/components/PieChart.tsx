'use client';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ICategorySchema, IAccountSchema } from '../../actions/type';
ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

interface IPieChart {
    categories: ICategorySchema[]
    accounts: IAccountSchema[]
}

export default function PieChart(
    props: IPieChart
) {
    const labels: string[] = [];
    const data: number[] = [];

    props.accounts.forEach(account => {
        const category = props.categories.find(category => category.id === account.category);
        if (!category)
            return;
        const fLabel = labels.findIndex(label => label === category.name);
        if (fLabel !== -1) {
            data[fLabel] += account.amount;
            return;
        } else {
            labels.push(category.name);
            data.push(account.amount);
        }
    })

    return (
        <Pie
            plugins={[ChartDataLabels]}
            data={{
                labels: labels,
                datasets: [
                    {
                        datalabels: {
                            color: '#000000'
                        },
                        backgroundColor: [
                            'rgb(221, 233, 91)',
                            'rgba(75, 192, 192, 1)',
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                        ],
                        data: data,
                        borderWidth: 1,
                    },
                ],
            }}
            options={{
                plugins: {
                    datalabels: {
                      display: true,
                      font: {
                        size: 16
                      }
                    }
                }
            }}
        />)
}