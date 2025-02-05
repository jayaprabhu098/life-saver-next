
'use client';
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function DateFilter() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const type = Number(searchParams.get('type') ?? 1);
    const [month, setMonth] = useState(searchParams.get('date') ?? dayjs().format("YYYY-MM"));
    useEffect(() => {
        router.replace(`./account?type=${type}&date=${month}`)
    }, [type])
    return (<input
        type="month"
        onChange={(e) => setMonth(e.target.value)}
        className="mr-10 text-white bg-slate-500 rounded-xl p-2"
        value={month}
    />)
}