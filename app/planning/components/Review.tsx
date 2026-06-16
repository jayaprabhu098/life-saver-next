'use client';
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';
import { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IPlanningDaySchema } from "@/app/actions/type";

interface IReview {
    day: IPlanningDaySchema | null;
    onReview: (day: IPlanningDaySchema) => Promise<void>;
}

type ReviewFormData = {
    tasks: {
        id: string;
        text: string;
        completed: boolean;
        description: string;
    }[];
};

export default function Review(props: IReview) {
    const [show, setShow] = useState(false);

    const form = useForm<ReviewFormData>({
        resolver: zodResolver(validators),
    });

    const { fields } = useFieldArray({
        control: form.control,
        name: 'tasks',
        keyName: 'fieldId',
    });

    const openReview = () => {
        if (!props.day) return;
        form.reset({
            tasks: props.day.tasks.map(task => ({
                id: task.id,
                text: task.text,
                completed: task.completed ?? false,
                description: task.description ?? '',
            }))
        });
        setShow(true);
    };

    const onSubmit = async (formData: ReviewFormData) => {
        if (!props.day) return;
        const updated: IPlanningDaySchema = {
            ...props.day,
            reviewedAt: new Date(),
            tasks: formData.tasks.map(task => ({
                id: task.id,
                text: task.text,
                completed: task.completed,
                description: task.description.trim() || null,
            }))
        };
        await props.onReview(updated);
        setShow(false);
    };

    if (!props.day) return null;

    return (
        <>
            {show && (
                <section className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-md transition-all duration-300 p-4">
                    <div className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                        <div className="text-xl font-bold mb-2 text-center text-zinc-900 dark:text-white uppercase tracking-wide">
                            Review
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center mb-6">
                            Mark each note as completed or not, and add a short description.
                        </p>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {fields.map((field, index) => (
                                <div
                                    key={field.fieldId}
                                    className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 space-y-3"
                                >
                                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                                        {field.text}
                                    </p>
                                    <input type="hidden" {...form.register(`tasks.${index}.id`)} />
                                    <input type="hidden" {...form.register(`tasks.${index}.text`)} />
                                    <div className="flex gap-3">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                value="true"
                                                checked={form.watch(`tasks.${index}.completed`) === true}
                                                onChange={() => form.setValue(`tasks.${index}.completed`, true)}
                                                className="accent-emerald-600"
                                            />
                                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">Done</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                value="false"
                                                checked={form.watch(`tasks.${index}.completed`) === false}
                                                onChange={() => form.setValue(`tasks.${index}.completed`, false)}
                                                className="accent-rose-600"
                                            />
                                            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase">Not Done</span>
                                        </label>
                                    </div>
                                    <textarea
                                        {...form.register(`tasks.${index}.description`)}
                                        rows={2}
                                        placeholder="What happened? Any notes..."
                                        className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-zinc-900 dark:text-white resize-none"
                                    />
                                </div>
                            ))}
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
                                    Save Review
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            )}
            <button
                onClick={openReview}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
                <FaMoon className="w-3 h-3" />
                <span>{props.day.reviewedAt ? 'Edit Review' : 'Review'}</span>
            </button>
        </>
    );
}

const validators = zod.object({
    tasks: zod.array(zod.object({
        id: zod.string(),
        text: zod.string(),
        completed: zod.boolean(),
        description: zod.string(),
    })).min(1),
});
