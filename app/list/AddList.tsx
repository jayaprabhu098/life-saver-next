'use client';
import { mutation } from "../actions/fetch";
import { APIData, FileAPIData, ListAdd } from "../actions/api";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';
import { useState } from "react";
import { IconDropDown } from "./IconDropDown";
import dayjs from "dayjs";

interface IProps {
    data: APIData;
    type: number;
    fileData: FileAPIData;
    refresh: () => Promise<void>;
    setShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AddList(props: IProps) {

    const [error, setError] = useState<string | null>(null);


    const form = useForm<ListAdd>({
        resolver: zodResolver(validators),
        defaultValues: {
            date: dayjs().format("YYYY-MM-DDTHH:mm") as unknown as Date,
            amount: 0
        }
    });


    const onSubmit = async (fromData: ListAdd) => {

        const categories = props.type == 1
            ? props.data.debitCategories
            : props.data.creditCategories;
        const category = categories.find(category =>
            category.id === Number(fromData.category)
        );
        if (!category)
            setError("Category Not Exist");
        else {
            if (props.type == 1)
                props.data.debitList.push({
                    category,
                    id: new Date().getTime(),
                    amount: fromData.amount,
                    comment: fromData.comment,
                    date: fromData.date,
                });
            else
                props.data.creditList.push({
                    category,
                    id: new Date().getTime(),
                    amount: fromData.amount,
                    comment: fromData.comment,
                    date: fromData.date,
                });
            const res = await mutation(props.data);
            if (res)
                setError(res);
            else {
                await props.refresh();
                props.setShowAdd(false);
            }
        }
    };

    return (
        <section
            className="inset-0 z-[999] h-screen w-screen bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300 fixed"
        >
            <div className="flex flex-col justify-center items-center h-screen w-screen">
                <div className="w-60 h-[27rem] bg-blue-400 rounded-md p-5">
                    <div
                        className="text-xl font-bold mb-5 text-center"
                    >Add {props.type == 1 ? "Expenses" : "Income"} List</div>

                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="h-20">
                            <div className="w-full">Category</div>
                            <Controller
                                name="category"
                                control={form.control}
                                render={({ field }) => (
                                    <IconDropDown
                                        onBlur={field.onBlur}
                                        onChange={field.onChange}
                                        value={field.value}
                                        fileData={props.fileData}
                                        options={props.type == 1
                                            ? props.data.debitCategories
                                            : props.data.creditCategories}
                                        className="w-full rounded border-black border-2 text-black"
                                    />
                                )}
                            />
                            {form.formState.errors.category
                                && <p
                                    className='text-red-700 text-sm'
                                >{form.formState.errors.category.message}</p>}
                        </div>
                        <div className="h-20">
                            <div className="w-full">Date</div>
                            <input {...form.register('date')}
                                type='datetime-local'
                                placeholder="dd-mm-yyyy"
                                className="w-full rounded border-black border-2 pl-2 pr-2 text-black"
                            />
                            {form.formState.errors.date
                                && <p
                                    className='text-red-700 text-sm'
                                >{form.formState.errors.date.message}</p>}
                        </div>
                        <div className="h-20">
                            <div className="w-full">comment</div>
                            <input
                                {...form.register('comment')}
                                className="w-full rounded border-black border-2 pl-2 pr-2 text-black"
                            />
                            {form.formState.errors.comment
                                && <p
                                    className='text-red-700 text-sm'
                                >{form.formState.errors.comment.message}</p>}
                        </div>
                        <div className="h-20">
                            <div className="w-full">Amount</div>
                            <input
                                {...form.register('amount')}
                                type="number"
                                className="w-full rounded border-black border-2 pl-2 pr-2 text-black"
                            />
                            {form.formState.errors.amount
                                &&
                                <p
                                    className='text-red-700 text-sm'
                                >{form.formState.errors.amount.message}</p>
                            }
                        </div>
                        <div className="h-5 flex justify-end items-center">
                            <button
                                type="submit"
                                className="w-20 rounded-md bg-black text-white"
                            >Add</button>
                            <button
                                type="button"
                                className="w-20 rounded-md bg-black text-white ml-2"
                                onClick={() => props.setShowAdd(false)}
                            >Cancel</button>
                        </div>
                        <p className='text-red-700 text-sm text-center'>{error}</p>
                    </form>
                </div>
            </div>
        </section>
    );
}

const validators = zod.object({
    category: zod.string(),
    date: zod.date(),
    comment: zod.string()
        .nullable(),
    amount: zod.number(),
});