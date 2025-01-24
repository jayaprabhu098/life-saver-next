'use client';
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useQuery } from "../actions/fetch";
import { Loader } from "../Loader";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(ArcElement, Tooltip, ChartDataLabels);



export default function Home() {

    const { data, error, loading, } = useQuery();
    const [month, setMonth] = useState(dayjs().format("YYYY-MM"));
    const [count, setCount] = useState({
        income: 0,
        expense: 0,
        saving: 0
    });


    useEffect(() => {
        if (data) {
            const countObj = {
                income: 0,
                expense: 0,
                saving: 0
            };
            data.debitList.forEach((list) => {
                if (dayjs(list.date).format("YYYY-MM") === month) {
                    countObj.expense += list.amount;
                }
            });
            data.creditList.forEach((list) => {
                if (dayjs(list.date).format("YYYY-MM") === month) {
                    countObj.income += list.amount;
                }
            });
            setCount(countObj);
        }
    }, [data, month]);

    if (loading)
        return <Loader />;

    if (error)
        return <p>Internal error: {error}</p>;

    return (
        <section className="flex flex-col justify-center items-center">

            <div className="self-end mt-5">
                <input
                    type="month"
                    onChange={(e) => setMonth(e.target.value)}
                    className="mr-10 text-white bg-slate-500 rounded-xl p-2"
                    value={month}
                />
            </div>
            <div className="mt-7 h-30">
                <p className="text-2xl font-bold text-center mb-5">Spending</p>
                <Pie
                    data={{
                        labels: ['Income', 'Expense'],
                        datasets: [
                            {
                                datalabels: {
                                    color: '#000000'
                                },
                                data: [count.expense, count.income - count.expense],
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
                />
            </div>
            <div className="mt-10 flex flex-wrap justify-center text-black">

                <div className="bg-orange-200 rounded-2xl h-28 w-28 flex flex-col justify-center items-center m-2">
                    <div>Balance</div>
                    <div>₹{count.income - count.expense}</div>
                </div>
                <div className="bg-cyan-200 rounded-2xl h-28 w-28 flex flex-col justify-center items-center m-2">
                    <div>Expense</div>
                    <div>₹{count.expense}</div>
                </div>
                <div className="bg-yellow-200 rounded-2xl h-28 w-28 flex flex-col justify-center items-center m-2">
                    <div>Income</div>
                    <div>₹{count.income}</div>
                </div>
            </div>

        </section>
    );
}