
'use client';
import { useSearch } from "./State";

export default function Toggle() {

    const {
        type,
        setType
    } = useSearch();

    return (<div className="flex justify-center mt-5">
        <div onClick={() => setType(1)} className={`w-24 h-10 pl-4 pt-2 rounded-md ${type == 1 ? 'bg-blue-400' : 'bg-slate-400'}`}>Expenses</div>
        <div onClick={() => setType(2)} className={`ml-2 w-24 h-10 pl-5 pt-2 rounded-md ${type == 2 ? 'bg-blue-400' : 'bg-slate-400'}`}>Income</div><br />
    </div>);
}