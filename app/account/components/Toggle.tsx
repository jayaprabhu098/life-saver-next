
'use client';
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import dayjs from "dayjs";

export default function Toggle() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [type, setType] = useState(Number(searchParams.get('type') ?? 1));
    const month = searchParams.get('date') ?? dayjs().format("YYYY-MM");
    useEffect(() => {
        router.replace(`./account?type=${type}&date=${month}`)
    }, [type])
    return (<div className="flex justify-center mt-5">
        <div onClick={() => setType(1)} className={`w-24 h-10 pl-4 pt-2 rounded-md ${type == 1 ? 'bg-blue-400' : 'bg-slate-400'}`}>Expenses</div>
        <div onClick={() => setType(2)} className={`ml-2 w-24 h-10 pl-5 pt-2 rounded-md ${type == 2 ? 'bg-blue-400' : 'bg-slate-400'}`}>Income</div><br />
    </div>)
}