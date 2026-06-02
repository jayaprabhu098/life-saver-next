
interface IDataCount {
    day: number;
    week: number;
    month: number;
}

export default function DataCount(props: IDataCount) {
    return (
        <div className="grid grid-cols-3 gap-4 w-full">
            <div className="bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm">
                <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Today</span>
                <span className="text-lg sm:text-xl font-extrabold mt-1 text-zinc-900 dark:text-zinc-50">₹{new Intl.NumberFormat('en-IN').format(props.day)}</span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm">
                <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">This Week</span>
                <span className="text-lg sm:text-xl font-extrabold mt-1 text-zinc-900 dark:text-zinc-50">₹{new Intl.NumberFormat('en-IN').format(props.week)}</span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm">
                <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">This Month</span>
                <span className="text-lg sm:text-xl font-extrabold mt-1 text-zinc-900 dark:text-zinc-50">₹{new Intl.NumberFormat('en-IN').format(props.month)}</span>
            </div>
        </div>
    );
}