'use client';
import { getAccountByDate, getAccounts, getCategories, getFiles } from "../actions/db.g";
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


export default function Account() {
    const { type, startDate, endDate, setType, month, year, setMonth, setYear } = useSearch();
    const [monthCount, setMonthCount] = useState(0);
    const [weekCount, setWeekCount] = useState(0);
    const [dayCount, setDayCount] = useState(0);
    const [files, setFiles] = useState<IFilesSchema[]>([]);
    const [categories, setCategories] = useState<ICategorySchema[]>([]);
    const [accounts, setAccounts] = useState<IAccountSchema[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const dates = getMonthWeekDayDate();
            const res = await Promise.all([
                getAccountByDate(type, dates.startMonthDate, dates.endMonthDate),
                getAccountByDate(type, dates.startWeekDate, dates.startWeekDate),
                getAccountByDate(type, dates.startDayDate, dates.startDayDate),
                getFiles(),
            ]);
            setMonthCount(res[0]);
            setWeekCount(res[1]);
            setDayCount(res[2]);
            setFiles(res[3]);
        };
        fetch();
    }, [type]);

    useEffect(() => {
        const fetch = async () => {
            if (!type)
                return;
            const res = await getCategories();
            setCategories(res);
        };
        fetch();
    }, [type]);

    useEffect(() => {
        const fetch = async () => {
            if (!type || !startDate || !endDate)
                return;
            const res = await getAccounts(type, startDate, endDate);
            setAccounts(res);
        };
        fetch();
    }, [type, startDate, endDate]);

    return (
        <section className="flex flex-col">
            <div className="self-end mt-5">
                <DateFilter month={month} year={year} setMonth={setMonth} setYear={setYear} />
            </div>
            <Add type={type} categories={categories} files={files} />
            <Toggle type={type} setType={setType} />
            <LineChart accounts={accounts} />
            <DataCount day={dayCount} month={monthCount} week={weekCount} />
            <DataTable accounts={accounts} categories={categories} files={files} />
        </section>
    );
}