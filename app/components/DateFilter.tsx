
'use client';
import { ChangeEvent } from "react";
import { useSearch } from "./State";

export default function DateFilter() {
    
    const {
        month,
        setMonth,
        year,
        setYear
    } = useSearch();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            const [eYear, eMonth] = e.target.value.split('-');
            setMonth(Number(eMonth));
            setYear(Number(eYear));
        }
    };

    return (<input
        type="month"
        onChange={onChange}
        className="mr-10 text-white bg-slate-500 rounded-xl p-2"
        value={year + '-' + String(month).padStart(2, '0')}
    />);
}