
'use client';
import dayjs from "dayjs";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface iDateFilter {
    page: string;
}
export default function DateFilter(props: iDateFilter) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [month, setMonth] = useState(searchParams.get('month') ?? (dayjs().get("month") + 1));
    const [year, setYear] = useState(searchParams.get('year') ?? dayjs().get("year"));

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('month', String(month));
        params.set('year', String(year));
        router.push(`./${props.page}${params.toString()}`);
    }, [month, year]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            const [eYear, eMonth] = e.target.value.split('-');
            setMonth(Number(eMonth));
            setYear(eYear);
        }
    };

    return (<input
        type="month"
        onChange={onChange}
        className="mr-10 text-white bg-slate-500 rounded-xl p-2"
        value={year + '-' + String(month).padStart(2, '0')}
    />);
}