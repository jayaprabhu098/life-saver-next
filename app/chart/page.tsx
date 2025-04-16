'use client';
import { useEffect, useState } from "react";
import { IAccountSchema, ICategorySchema } from "../actions/type";
import * as API from "../actions/api";
import { useSearch } from "../components/State";
import DateFilter from "../components/DateFilter";
import Toggle from "../components/Toggle";
import PieChart from "./components/PieChart";

export default function Chart() {
    const { type, startDate, endDate, setType, month, year, setMonth, setYear } = useSearch();
    const [categories, setCategories] = useState<ICategorySchema[]>([]);
    const [accounts, setAccounts] = useState<IAccountSchema[]>([]);
    const [typeAccounts, setTypeAccounts] = useState<IAccountSchema[]>([]);
    const [typeCategories, setTypeCategories] = useState<ICategorySchema[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const [categoryRes, accountRes] = await Promise.all([
                API.getCategories(),
                API.getAccounts()
            ])
            setCategories(categoryRes);
            setAccounts(accountRes);
        }
        fetch()
    }, [])


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

    return (
        <section className="flex flex-col">
            <div className="self-end mt-5">
                <DateFilter month={month} year={year} setMonth={setMonth} setYear={setYear} />
            </div>
            <Toggle type={type} setType={setType} />
            <PieChart categories={typeCategories} accounts={typeAccounts} />
        </section>
    );
}