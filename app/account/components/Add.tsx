'use client';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';
import { useState } from "react";
import { IconDropDown } from "./IconDropDown";
import dayjs from "dayjs";
import { IAccountSchema, ICategorySchema, IFilesSchema } from "@/app/actions/type";
import { FaPlus } from "react-icons/fa";
import { insertAccount } from "@/app/actions/api";
import { useRouter } from "next/navigation";

interface IProps {
    type: number;
    categories: ICategorySchema[];
    files: IFilesSchema[]
}
export default function Add(props: IProps) {

    const [show, setShow] = useState(false);
    const router = useRouter()

    const form = useForm<IAccountSchema>({
        resolver: zodResolver(validators),
        defaultValues: {
            createdAt: dayjs().format("YYYY-MM-DDTHH:mm") as unknown as Date,
        }
    });

    const onSubmit = async (fromData: IAccountSchema) => {
        if (fromData) {
            fromData.amount = Number(fromData.amount)
            fromData.createdAt = dayjs(fromData.createdAt).toDate()
            fromData.type = props.type;
            await insertAccount(fromData);
            form.reset();
            setShow(false);
            router.refresh();
        }
    };

    return (
        <>
            {show && <section
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
                                            files={props.files}
                                            categories={props.categories}
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
                                <input {...form.register('createdAt')}
                                    type='datetime-local'
                                    placeholder="dd-mm-yyyy"
                                    className="w-full rounded border-black border-2 pl-2 pr-2 text-black"
                                />
                                {form.formState.errors.createdAt
                                    && <p
                                        className='text-red-700 text-sm'
                                    >{form.formState.errors.createdAt.message}</p>}
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
                                    onClick={() => setShow(false)}
                                >Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>}
            <button
                onClick={() => setShow(true)}
                className="self-end mr-2 w-16 h-6 m-3">
                <FaPlus />
            </button>
        </>
    );
}

const validators = zod.object({
    category: zod.string(),
    createdAt: zod.string(),
    comment: zod.string()
        .nullable(),
    amount: zod.string(),
});