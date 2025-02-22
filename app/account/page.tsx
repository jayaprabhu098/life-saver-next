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

export default function Account() {
    const { type, startDate, endDate, setType, month, year, setMonth, setYear } = useSearch();
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
                API.getAccounts()
            ])
            setFiles(fileRes);
            setCategories(categoryRes);
            setAccounts(accountRes);
        }
        fetch()
    }, [])

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
        await API.saveAccount(_accounts);
    }

    const onDelete = async (
        accountId: string
    ) => {
        const _accounts = accounts.filter(account =>
            account.id != accountId
        )
        setAccounts(_accounts);
        await API.saveAccount(_accounts);
    }


    return (
        <section className="flex flex-col">
            <div className="self-end mt-5">
                <DateFilter month={month} year={year} setMonth={setMonth} setYear={setYear} />
            </div>
            <Add type={type} categories={typeCategories} files={files} addAccount={addAccount} />
            <Toggle type={type} setType={setType} />
            <LineChart accounts={typeAccounts} />
            <DataCount day={count.day} month={count.month} week={count.week} />
            <DataTable accounts={typeAccounts} categories={categories} files={files} onDelete={onDelete} />
        </section>
    );
}