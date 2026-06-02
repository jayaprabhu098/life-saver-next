'use client';
import DataTable from "./components/DataTable";
import Add from "./components/Add";
import LineChart from "./components/LineChart";
import DataCount from "./components/DataCount";
import DateFilter from "../components/DateFilter";
import Toggle from "../components/Toggle";
import { getMonthWeekDayDate } from "../actions/date";
import { useSearch } from "../components/State";
import { useEffect, useState } from "react";
import { IAccountSchema, ICategorySchema, IFilesSchema } from "../actions/type";
import * as API from "../actions/api";
import { v4 as ID } from 'uuid'
import User from "../components/User";

export default function Account() {
    const { type, startDate, endDate, setType, month, year, setMonth, setYear, user, setUser } = useSearch();
    const [count, setCount] = useState({
        day: 0,
        month: 0,
        week: 0
    });
    const [files, setFiles] = useState<IFilesSchema[]>([]);
    const [categories, setCategories] = useState<ICategorySchema[]>([]);
    const [accounts, setAccounts] = useState<IAccountSchema[]>([]);
    const [typeAccounts, setTypeAccounts] = useState<IAccountSchema[]>([]);
    const [typeCategories, setTypeCategories] = useState<ICategorySchema[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const [fileRes, categoryRes, accountRes] = await Promise.all([
                API.getFiles(),
                API.getCategories(),
                API.getAccounts(user)
            ])
            setFiles(fileRes);
            setCategories(categoryRes);
            setAccounts(accountRes);
        }
        fetch()
    }, [user])

    useEffect(() => {
        const dates = getMonthWeekDayDate();
        const countRes = {
            day: 0,
            month: 0,
            week: 0
        }
        accounts.forEach(account => {
            account.createdAt = new Date(account.createdAt)
            if (type == account.type) {
                if (account.createdAt.getTime() >= dates.startDayDate.getTime()
                    && account.createdAt.getTime() <= dates.endDayDate.getTime())
                    countRes.day += account.amount;

                if (account.createdAt.getTime() >= dates.startMonthDate.getTime()
                    && account.createdAt.getTime() <= dates.endMonthDate.getTime())
                    countRes.month += account.amount;

                if (account.createdAt.getTime() >= dates.startWeekDate.getTime()
                    && account.createdAt.getTime() <= dates.endWeekDate.getTime())
                    countRes.week += account.amount;
            }
        })
        setCount(countRes)
    }, [type, accounts]);

    useEffect(() => {
        if (!type || !startDate || !endDate)
            return;
        const _accounts = accounts.filter(account => {
            account.createdAt = new Date(account.createdAt)
            return account.createdAt.getTime() >= startDate.getTime()
                && account.createdAt.getTime() <= endDate.getTime()
                && account.type == type
        }
        );
        const _categories = categories.filter(category =>
            category.type == type
        )
        setTypeAccounts(_accounts);
        setTypeCategories(_categories);
    }, [type, startDate, endDate, accounts, categories]);

    const addAccount = async (account: IAccountSchema) => {
        account.type = type;
        account.createdAt = new Date(account.createdAt);
        account.id = ID();
        const _accounts = [...accounts, account]
        setAccounts(_accounts);
        await API.saveAccount(_accounts, user);
    }

    const onDelete = async (
        accountId: string
    ) => {
        const _accounts = accounts.filter(account =>
            account.id != accountId
        )
        setAccounts(_accounts);
        await API.saveAccount(_accounts, user);
    }


    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col">
            {/* Header controls block */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-700 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent uppercase">
                        Transactions Ledger
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Detailed overview and creation of your income and expenses.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <User user={user} setUser={setUser}/>
                    <DateFilter month={month} year={year} setMonth={setMonth} setYear={setYear} />
                </div>
            </div>

            {/* Main Toggle and Add Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-3xl px-6 py-2 shadow-sm mb-8">
                <div className="flex-1">
                    <Toggle type={type} setType={setType} />
                </div>
                <div>
                    <Add type={type} categories={typeCategories} files={files} addAccount={addAccount} />
                </div>
            </div>

            {/* Chart Area */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm mb-8">
                <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-4">Daily Trend</p>
                <LineChart accounts={typeAccounts} />
            </div>

            {/* Counts Section */}
            <div className="mb-8">
                <DataCount day={count.day} month={count.month} week={count.week} />
            </div>

            {/* Detailed Table */}
            <div className="mb-8">
                <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">Transaction History</p>
                <DataTable accounts={typeAccounts} categories={categories} files={files} onDelete={onDelete} />
            </div>
        </section>
    );
}