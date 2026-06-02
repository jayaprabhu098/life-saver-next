'use client'
import dayJs from "dayjs";
import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
} from "chart.js";
import { IAccountSchema } from "@/app/actions/type";

interface ILineChart {
    accounts: IAccountSchema[],
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
);

export default function LineChart(
    props: ILineChart
) {
    const data: {
        name: string;
        total: number;
    }[] = [];
    
    props.accounts.forEach(list => {
        const date = dayJs(list.createdAt).format("D");
        const index = data.findIndex(d =>
            d.name === date
        );
        if (index === -1) {
            data.push({
                name: date,
                total: list.amount
            });
        } else {
            data[index].total += list.amount;
        }
    });

    // Sort chronologically by day of month
    data.sort((a, b) => Number(a.name) - Number(b.name));

    return (
        <div className="flex justify-center w-full h-64 align-center m-auto mt-6">
            <Bar
                data={{
                    labels: data.map(d => `Day ${d.name}`),
                    datasets: [
                        {
                            data: data.map(d => d.total),
                            backgroundColor: 'rgba(99, 102, 241, 0.85)',
                            hoverBackgroundColor: 'rgba(99, 102, 241, 1)',
                            borderRadius: 6,
                            barThickness: 12,
                        }
                    ]
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            backgroundColor: 'rgba(24, 24, 27, 0.95)',
                            titleColor: '#ffffff',
                            bodyColor: '#e4e4e7',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            borderWidth: 1,
                            padding: 10,
                            boxPadding: 4,
                            displayColors: false,
                            callbacks: {
                                label: (context) => `Total: ₹${new Intl.NumberFormat('en-IN').format(context.raw as number)}`
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                            ticks: {
                                color: 'var(--text-muted)',
                                font: {
                                    size: 10,
                                    weight: 'bold'
                                }
                            }
                        },
                        y: {
                            grid: {
                                color: 'rgba(128, 128, 128, 0.1)',
                            },
                            ticks: {
                                color: 'var(--text-muted)',
                                font: {
                                    size: 10,
                                }
                            }
                        }
                    }
                }}
            />
        </div>
    );
}