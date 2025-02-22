'use client'
import PieChart from "./components/PieChart";
import DateFilter from "../components/DateFilter";
import { CategoryType, IAccountSchema } from "../actions/type";
import { useEffect, useState } from "react";
import { useSearch } from "../components/State";
import * as API from "../actions/api";

export default function Home() {

    const { startDate, endDate, month, year, setMonth, setYear } = useSearch();
    const [expense, setExpense] = useState(0);
    const [income, setIncome] = useState(0);
    const [accounts, setAccounts] = useState<IAccountSchema[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await API.getAccounts();
            setAccounts(res);
        }
        fetch()
    }, [startDate, endDate]);

    useEffect(() => {
        if (!startDate || !endDate)
            return;
        const count = {
            expense: 0,
            income: 0
        }
        accounts.forEach(account => {
            account.createdAt = new Date(account.createdAt)
            if (account.createdAt.getTime() >= startDate.getTime()
                && account.createdAt.getTime() <= endDate.getTime()) {
                if (account.type == CategoryType.credit) {
                    count.income += account.amount;
                } else {
                    count.expense += account.amount;

                }
            }
        });
        setExpense(count.expense)
        setIncome(count.income)
    }, [startDate, endDate, accounts])

    return (
        <section className="flex flex-col justify-center items-center">

            <div className="self-end mt-5">
                <DateFilter month={month} year={year} setMonth={setMonth} setYear={setYear} />
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