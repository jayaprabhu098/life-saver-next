'use client';
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useSearch() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [type, setType] = useState(1);
    const [month, setMonth] = useState(dayjs().get("month") + 1);
    const [year, setYear] = useState(dayjs().get("year"));

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('type', String(type));
        params.set('month', String(month));
        params.set('year', String(year));
        router.replace(`${pathname}?${params.toString()}`);
    }, [type, pathname, router, searchParams]);


    return {
        type,
        setType,
        month,
        setMonth,
        year,
        setYear
    }

}