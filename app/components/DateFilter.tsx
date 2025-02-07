
'use client';
import dayjs from "dayjs";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function DateFilter() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [month, setMonth] = useState(searchParams.get('month') ?? (dayjs().get("month") + 1));
    const [year, setYear] = useState(searchParams.get('year') ?? dayjs().get("year"));

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('month', String(month));
        params.set('year', String(year));
        router.replace(`${pathname}?${params.toString()}`);
    }, [month, year, pathname, router, searchParams]);

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