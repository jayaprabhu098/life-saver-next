
'use client';
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Toggle() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [type, setType] = useState(Number(searchParams.get('type') ?? 1));

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('type', String(type));
        router.replace(`${pathname}?${params.toString()}`);
    }, [type, pathname, router, searchParams]);

    return (<div className="flex justify-center mt-5">
        <div onClick={() => setType(1)} className={`w-24 h-10 pl-4 pt-2 rounded-md ${type == 1 ? 'bg-blue-400' : 'bg-slate-400'}`}>Expenses</div>
        <div onClick={() => setType(2)} className={`ml-2 w-24 h-10 pl-5 pt-2 rounded-md ${type == 2 ? 'bg-blue-400' : 'bg-slate-400'}`}>Income</div><br />
    </div>);
}