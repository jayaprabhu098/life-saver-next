'use client'
import { IPlanningDaySchema } from '@/app/actions/type';
import { FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import dayjs from 'dayjs';
import Review from './Review';
import Edit from './Edit';
import { useState } from 'react';

interface IDataTable {
    list: IPlanningDaySchema[];
    onDelete: (id: string) => Promise<void>;
    onReview: (day: IPlanningDaySchema) => Promise<void>;
    onEdit: (dayId: string, notes: string) => Promise<void>;
}

function StatusBadge({ day }: { day: IPlanningDaySchema }) {
    const total = day.tasks.length;
    const reviewed = day.tasks.filter(t => t.completed !== null).length;
    const done = day.tasks.filter(t => t.completed).length;

    if (reviewed < total) {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-500/15 text-amber-800 dark:text-amber-400 whitespace-nowrap">
                {reviewed > 0 ? `${reviewed}/${total} Reviewed` : 'Pending Review'}
            </span>
        );
    }

    const allDone = done === total;
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold whitespace-nowrap ${allDone
            ? 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-400'
            : 'bg-rose-100 dark:bg-rose-500/15 text-rose-800 dark:text-rose-400'
            }`}>
            {done}/{total} Completed
        </span>
    );
}

function PlanCard({
    day,
    onDelete,
    onReview,
    onEdit,
}: {
    day: IPlanningDaySchema;
    onDelete: (id: string) => Promise<void>;
    onReview: (day: IPlanningDaySchema) => Promise<void>;
    onEdit: (dayId: string, notes: string) => Promise<void>;
}) {
    const [expanded, setExpanded] = useState(false);

    return (
        <article className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                        <p className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50">
                            {dayjs(day.date).format("DD MMM YYYY")}
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                            {day.tasks.length} {day.tasks.length === 1 ? 'note' : 'notes'}
                        </p>
                    </div>
                    <StatusBadge day={day} />
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Edit day={day} onEdit={onEdit} />
                    <Review day={day} onReview={onReview} />
                    <button
                        onClick={() => setExpanded(v => !v)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold transition-colors cursor-pointer"
                    >
                        {expanded ? <FaChevronUp className="w-3 h-3" /> : <FaChevronDown className="w-3 h-3" />}
                        <span>{expanded ? 'Hide Notes' : 'Show Notes'}</span>
                    </button>
                    <button
                        onClick={() => onDelete(day.id)}
                        className="inline-flex items-center gap-1.5 p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer ml-auto sm:ml-0"
                        title="Delete plan"
                    >
                        <FaTrash className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            {expanded && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 space-y-3 border-t border-zinc-100 dark:border-zinc-800/80">
                    {day.tasks.map((task, i) => (
                        <div
                            key={task.id}
                            className="p-3 sm:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800"
                        >
                            <div className="flex items-start gap-2">
                                <span className="text-xs font-bold text-zinc-400 shrink-0 mt-0.5">{i + 1}.</span>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 break-words">
                                        {task.text}
                                    </p>
                                    {task.completed !== null && (
                                        <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-2">
                                            <span className={`text-xs font-bold uppercase shrink-0 ${task.completed
                                                ? 'text-emerald-600 dark:text-emerald-400'
                                                : 'text-rose-600 dark:text-rose-400'
                                                }`}>
                                                {task.completed ? 'Done' : 'Not Done'}
                                            </span>
                                            {task.description && (
                                                <span className="text-xs text-zinc-500 dark:text-zinc-400 break-words">
                                                    {task.description}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </article>
    );
}

export default function DataTable(props: IDataTable) {
    return (
        <div className="flex flex-col gap-4 w-full min-w-0">
            {props.list.map(day => (
                <PlanCard
                    key={day.id}
                    day={day}
                    onDelete={props.onDelete}
                    onReview={props.onReview}
                    onEdit={props.onEdit}
                />
            ))}
        </div>
    );
}
