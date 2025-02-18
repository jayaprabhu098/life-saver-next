
'use client';

interface IToggle {
    type: number,
    setType: (type: number) => void
}
export default function Toggle(props: IToggle) {

    return (<div className="flex justify-center mt-5">
        <div onClick={() => props.setType(1)} className={`w-24 h-10 pl-4 pt-2 rounded-md ${props.type == 1 ? 'bg-blue-400' : 'bg-slate-400'}`}>Expenses</div>
        <div onClick={() => props.setType(2)} className={`ml-2 w-24 h-10 pl-5 pt-2 rounded-md ${props.type == 2 ? 'bg-blue-400' : 'bg-slate-400'}`}>Income</div><br />
    </div>);
}
