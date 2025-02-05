
'use client';
import dayjs from "dayjs";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function DateFilter() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [month, setMonth] = useState(searchParams.get('month') ?? dayjs().format("MM"));
    const [year, setYear] = useState(searchParams.get('year') ?? dayjs().format("YYYY"));

    useEffect(() => {
        router.push(`./home?month=${month}&year=${year}`)
    }, [month, year])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            const [eYear, eMonth] = e.target.value.split('-');
            setMonth(eMonth)
            setYear(eYear)
        }
    }

    return (<input
        type="month"
        onChange={onChange}
        className="mr-10 text-white bg-slate-500 rounded-xl p-2"
        value={year + '-' + month}
    />)
}