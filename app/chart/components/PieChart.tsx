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

    const chartColors = [
        '#6366f1', // Indigo
        '#10b981', // Emerald
        '#f59e0b', // Amber
        '#ec4899', // Pink
        '#06b6d4', // Cyan
        '#f43f5e', // Rose
        '#8b5cf6', // Violet
        '#14b8a6', // Teal
        '#f97316', // Orange
        '#a855f7', // Purple
        '#0ea5e9', // Sky
        '#d946ef', // Fuchsia
    ];

    return (
        <Pie
            plugins={[ChartDataLabels]}
            data={{
                labels: labels,
                datasets: [
                    {
                        datalabels: {
                            color: '#ffffff',
                            font: {
                                weight: 'bold',
                                size: 12
                            }
                        },
                        backgroundColor: chartColors.slice(0, labels.length),
                        borderColor: 'transparent',
                        data: data,
                        borderWidth: 0,
                    },
                ],
            }}
            options={{
                plugins: {
                    datalabels: {
                      display: true,
                      font: {
                        size: 13
                      }
                    },
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