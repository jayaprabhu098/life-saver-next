'use client'
import PieChart from "./components/PieChart";
import DateFilter from "../components/DateFilter";
import { CategoryType, IAccountSchema } from "../actions/type";
import { useEffect, useState } from "react";
import { useSearch } from "../components/State";
import * as API from "../actions/api";
import User from "../components/User";

export default function Home() {

    const { startDate, endDate, month, year, setMonth, setYear, user, setUser } = useSearch();
    const [expense, setExpense] = useState(0);
    const [income, setIncome] = useState(0);
    const [accounts, setAccounts] = useState<IAccountSchema[]>([]);



    useEffect(() => {
        const fetch = async () => {
            const res = await API.getAccounts(user);
            setAccounts(res);
        }
        fetch()
    }, [startDate, endDate, user]);

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
        <section className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col">
            {/* Header controls block */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-700 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent uppercase">
                        Financial Dashboard
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Track, analyze and manage your monthly transactions.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <User user={user} setUser={setUser}/>
                    <DateFilter month={month} year={year} setMonth={setMonth} setYear={setYear} />
                </div>
            </div>

            {/* Spending Chart Section */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-center shadow-sm w-full max-w-md mx-auto">
                <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200 text-center mb-6">Spending Breakdown</p>
                <div className="w-full max-w-[280px] aspect-square flex items-center justify-center">
                    <PieChart expense={expense} income={income} />
                </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 w-full">
                {/* Balance Card */}
                <div className="bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent border border-indigo-500/20 dark:border-indigo-500/10 rounded-2xl p-5 flex flex-col justify-between shadow-sm min-h-[110px] transition-all hover:scale-[1.01]">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Total Balance</span>
                        <span className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                        </span>
                    </div>
                    <div className="text-2xl font-black mt-3 text-zinc-950 dark:text-zinc-50">
                        ₹{new Intl.NumberFormat('en-IN').format(income - expense)}
                    </div>
                </div>

                {/* Expense Card */}
                <div className="bg-gradient-to-br from-rose-500/10 via-transparent to-transparent border border-rose-500/20 dark:border-rose-500/10 rounded-2xl p-5 flex flex-col justify-between shadow-sm min-h-[110px] transition-all hover:scale-[1.01]">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">Total Expense</span>
                        <span className="p-1.5 bg-rose-500/10 rounded-lg text-rose-600 dark:text-rose-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/></svg>
                        </span>
                    </div>
                    <div className="text-2xl font-black mt-3 text-zinc-950 dark:text-zinc-50">
                        ₹{new Intl.NumberFormat('en-IN').format(expense)}
                    </div>
                </div>

                {/* Income Card */}
                <div className="bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent border border-emerald-500/20 dark:border-emerald-500/10 rounded-2xl p-5 flex flex-col justify-between shadow-sm min-h-[110px] transition-all hover:scale-[1.01]">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Total Income</span>
                        <span className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-600 dark:text-emerald-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                        </span>
                    </div>
                    <div className="text-2xl font-black mt-3 text-zinc-950 dark:text-zinc-50">
                        ₹{new Intl.NumberFormat('en-IN').format(income)}
                    </div>
                </div>
            </div>
        </section>
    );
}