'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';
import { useState } from "react";
import Image from 'next/image';
import { FaPlus } from "react-icons/fa";
import { ICategorySchema } from "@/app/actions/type";

interface IProps {
    type: number;
    addFile: (file: string) => Promise<string>
    addCategory: (category: ICategorySchema) => Promise<void>
}
export default function Add(props: IProps) {
    const [show, setShow] = useState(false);
    const [file, setFile] = useState<string | null>(null)

    const form = useForm<ICategorySchema>({
        resolver: zodResolver(validators),
    });

    const onChangeFile = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.files) {
            const reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onload = async () => {
                if (!reader.result)
                    return;
                const file = reader.result.toString();
                const id = await props.addFile(file)
                form.setValue('icon', id);
                setFile(file)
            }
        }
    };


    const onSubmit = async (fromData: ICategorySchema) => {
        await props.addCategory(fromData);
        form.reset();
        setFile(null);
        setShow(false);
    };


    return (
        <>
            {show && (
                <section className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-md transition-all duration-300 p-4">
                    <div className="w-full max-w-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
                        <div className="text-xl font-bold mb-6 text-center text-zinc-900 dark:text-white uppercase tracking-wide">
                            Add {props.type == 1 ? "Expense" : "Income"} Category
                        </div>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <div className="flex w-full justify-between items-center mb-1.5">
                                    <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Category Icon</span>
                                    {file && (
                                        <div className="p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                                            <Image src={file} className="object-contain" alt="Selected icon" width={24} height={24} />
                                        </div>
                                    )}
                                </div>
                                <div className="relative border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex flex-col items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-950 transition-colors cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/png"
                                        onChange={onChangeFile}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="text-center">
                                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Click to upload icon</span>
                                        <p className="text-[10px] text-zinc-400 mt-0.5">PNG format only</p>
                                    </div>
                                </div>
                                {form.formState.errors.icon && (
                                    <p className="text-red-500 text-xs mt-1 font-medium">
                                        {form.formState.errors.icon.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                                    Category Name
                                </label>
                                <input
                                    {...form.register('name')}
                                    placeholder="e.g. Food, Salary"
                                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-zinc-900 dark:text-white"
                                />
                                {form.formState.errors.name && (
                                    <p className="text-red-500 text-xs mt-1 font-medium">
                                        {form.formState.errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-3 pt-4">
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
                                    Add Category
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            )}
            <button
                onClick={() => setShow(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer self-center"
            >
                <FaPlus className="w-3.5 h-3.5" />
                <span>New Category</span>
            </button>
        </>
    )
}

const validators = zod.object({
    name: zod.string(),
    icon: zod.string()
});
