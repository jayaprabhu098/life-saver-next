'use client'
import { ISavingListSchema, ISavingSchema } from '@/app/actions/type';
import { Line } from 'rc-progress';

interface IProcessBar {
    saving: ISavingSchema;
    list: ISavingListSchema[]
}
export function ProcessBar(props: IProcessBar) {
    if (!props.saving) return null;
    const amount = props.list.reduce((a, b) => a + b.amount, 0);
    const processedRaw = props.saving.target > 0 ? (amount / props.saving.target) * 100 : 0;
    const processed = Math.round(processedRaw * 10) / 10; // 1 decimal place

    return (
        <section className="w-full flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6">
                <div>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Active Savings Goal</span>
                    <h2 className="text-2xl font-black mt-1 text-zinc-900 dark:text-white leading-tight">
                        {props.saving.name}
                    </h2>
                </div>
                <div className="flex gap-6 sm:self-end">
                    <div>
                        <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">Raised</span>
                        <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">
                            ₹{new Intl.NumberFormat('en-IN').format(amount)}
                        </span>
                    </div>
                    <div>
                        <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">Target Goal</span>
                        <span className="text-lg font-extrabold text-zinc-900 dark:text-zinc-50">
                            ₹{new Intl.NumberFormat('en-IN').format(props.saving.target)}
                        </span>
                    </div>
                </div>
            </div>
            
            <div className="relative">
                <div className="flex justify-between items-center text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2">
                    <span>Progress</span>
                    <span className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-lg">
                        {processed}%
                    </span>
                </div>
                <Line
                    percent={processed}
                    trailWidth={2.5}
                    strokeWidth={2.5}
                    className="w-full h-3 rounded-full overflow-hidden"
                    strokeColor="#6366f1"
                    trailColor="var(--card-border)"
                />
            </div>
        </section>
    );
}
