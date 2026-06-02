"use client";
import { useEffect, useState } from "react";
import { IAccountSchema, ICategorySchema } from "../actions/type";
import * as API from "../actions/api";
import { useSearch } from "../components/State";
import DateFilter from "../components/DateFilter";
import Toggle from "../components/Toggle";
import PieChart from "./components/PieChart";
import User from "../components/User";

export default function Chart() {
  const { type, startDate, endDate, setType, month, year, setMonth, setYear, user, setUser } =
    useSearch();
  const [categories, setCategories] = useState<ICategorySchema[]>([]);
  const [accounts, setAccounts] = useState<IAccountSchema[]>([]);
  const [typeAccounts, setTypeAccounts] = useState<IAccountSchema[]>([]);
  const [typeCategories, setTypeCategories] = useState<ICategorySchema[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const [categoryRes, accountRes] = await Promise.all([
        API.getCategories(),
        API.getAccounts(user),
      ]);
      setCategories(categoryRes);
      setAccounts(accountRes);
    };
    fetch();
  }, [user]);

  useEffect(() => {
    if (!type || !startDate || !endDate) return;
    const _accounts = accounts.filter((account) => {
      account.createdAt = new Date(account.createdAt);
      return (
        account.createdAt.getTime() >= startDate.getTime() &&
        account.createdAt.getTime() <= endDate.getTime() &&
        account.type == type
      );
    });
    const _categories = categories.filter((category) => category.type == type);
    setTypeAccounts(_accounts);
    setTypeCategories(_categories);
  }, [type, startDate, endDate, accounts, categories]);

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col">
      {/* Header controls block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-700 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent uppercase">
            Breakdown Analysis
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Visual analysis of transaction distributions by category.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <User user={user} setUser={setUser}/>
          <DateFilter
            month={month}
            year={year}
            setMonth={setMonth}
            setYear={setYear}
          />
        </div>
      </div>

      {/* Main Toggle Bar */}
      <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-3xl px-6 py-2 shadow-sm mb-8">
        <Toggle type={type} setType={setType} />
      </div>

      {/* Pie Chart Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm w-full max-w-md mx-auto">
        <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200 text-center mb-6">Distribution by Category</p>
        <div className="w-full max-w-[280px] aspect-square flex items-center justify-center mx-auto">
          <PieChart categories={typeCategories} accounts={typeAccounts} />
        </div>
      </div>
    </section>
  );
}
