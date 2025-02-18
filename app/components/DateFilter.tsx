
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

    return (<input
        type="month"
        onChange={onChange}
        className="mr-10 text-white bg-slate-500 rounded-xl p-2"
        value={props.year + '-' + String(props.month).padStart(2, '0')}
    />);
}
