'use client'
import PieChart from "./components/PieChart";
import DateFilter from "../components/DateFilter";
import { getAccountByDate } from "../actions/api";
import { CategoryType } from "../actions/type";
import { useEffect, useState } from "react";
import { useSearch } from "../components/State";

export default function Home() {

    const { startDate, endDate } = useSearch();
    const [expense, setExpense] = useState(0);
    const [income, setIncome] = useState(0);

    useEffect(() => {
        const fetch = async () => {
            if (!startDate || !endDate)
                return;
            const [expenseCount, incomeCount] = await Promise.all([
                getAccountByDate(CategoryType.debit, startDate, endDate),
                getAccountByDate(CategoryType.credit, startDate, endDate)
            ])
            setExpense(expenseCount)
            setIncome(incomeCount)

        }
        fetch()
    }, [startDate, endDate])

    return (
        <section className="flex flex-col justify-center items-center">

            <div className="self-end mt-5">
                <DateFilter />
            </div>
            <div className="mt-7">
                <p className="text-2xl font-bold text-center mb-5">Spending</p>
                <PieChart expense={expense} income={income} />
            </div>
            <div className="mt-10 flex flex-wrap justify-center text-black">

                <div className="bg-orange-200 rounded-2xl h-28 w-28 flex flex-col justify-center items-center m-2">
                    <div>Balance</div>
                    <div>₹{income - expense}</div>
                </div>
                <div className="bg-cyan-200 rounded-2xl h-28 w-28 flex flex-col justify-center items-center m-2">
                    <div>Expense</div>
                    <div>₹{expense}</div>
                </div>
                <div className="bg-yellow-200 rounded-2xl h-28 w-28 flex flex-col justify-center items-center m-2">
                    <div>Income</div>
                    <div>₹{income}</div>
                </div>
            </div>

        </section>
    );
}