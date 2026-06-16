'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';
import { useState } from "react";
import { FaSun } from "react-icons/fa";
import dayjs from 'dayjs';

const todayDate = () => dayjs().format('YYYY-MM-DD');

interface IAdd {
    addPlan: (date: string, notes: string) => Promise<void>
}

type FormData = {
    date: string;
    notes: string;
}

export default function Add(props: IAdd) {
    const [show, setShow] = useState(false);

    const form = useForm<FormData>({
        resolver: zodResolver(validators),
        defaultValues: { date: todayDate(), notes: '' }
    });

    const openModal = () => {
        form.reset({ date: todayDate(), notes: '' });
        setShow(true);
    };

    const onSubmit = async (formData: FormData) => {
        await props.addPlan(formData.date, formData.notes);
        form.reset({ date: todayDate(), notes: '' });
        setShow(false);
    };

    return (
        <>
            {show && (
                <section className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-md transition-all duration-300 p-4">
                    <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
                        <div className="text-xl font-bold mb-2 text-center text-zinc-900 dark:text-white uppercase tracking-wide">
                            Day Plan
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center mb-6">
                            Add your notes — one task per line.
                        </p>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                                    Date
                                </label>
                                <input
                                    {...form.register('date')}
                                    type="date"
                                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-zinc-900 dark:text-white"
                                />
                                {form.formState.errors.date && (
                                    <p className="text-red-500 text-xs mt-1 font-medium">
                                        {form.formState.errors.date.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                                    Notes
                                </label>
                                <textarea
                                    {...form.register('notes')}
                                    rows={6}
                                    placeholder={"Review project docs\nExercise 30 min\nCall dentist"}
                                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm font-medium shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-zinc-900 dark:text-white resize-none"
                                />
                                {form.formState.errors.notes && (
                                    <p className="text-red-500 text-xs mt-1 font-medium">
                                        {form.formState.errors.notes.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    className="flex-1 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm font-bold cursor-pointer transition-all duration-200"
                                    onClick={() => setShow(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 cursor-pointer transition-all duration-200"
                                >
                                    Save Plan
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            )}
            <button
                onClick={openModal}
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-white rounded-xl text-sm font-semibold shadow-md shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer self-center"
            >
                <FaSun className="w-3.5 h-3.5" />
                <span>Day Plan</span>
            </button>
        </>
    );
}

const validators = zod.object({
    date: zod.string().min(1, 'Select a date'),
    notes: zod.string().min(1, 'Add at least one note'),
});
