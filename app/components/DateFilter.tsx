
'use client';
import { ChangeEvent } from "react";
interface IDateFilter {
    month: number;
    setMonth: (month: number) => void;
    year: number;
    setYear: (year: number) => void;
}
export default function DateFilter(props: IDateFilter) {

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            const [eYear, eMonth] = e.target.value.split('-');
            props.setMonth(Number(eMonth));
            props.setYear(Number(eYear));
        }
    };

    return (
        <input
            type="month"
            onChange={onChange}
            className="text-zinc-800 dark:text-zinc-100 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer mr-6"
            value={props.year + '-' + String(props.month).padStart(2, '0')}
        />
    );
}
