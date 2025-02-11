'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ISavingListSchema, ISavingSchema } from "@/app/actions/type";
import { insertSavingList } from "@/app/actions/api";
import { useRouter } from 'next/navigation'

interface ISave {
    saving: ISavingSchema
}
export default function Add(props: ISave) {
    const [show, setShow] = useState(false);
    const router = useRouter()

    const form = useForm<ISavingListSchema>({
        resolver: zodResolver(validators),
        defaultValues: {
            ...props.saving
        }
    });


    const onSubmit = async (fromData: ISavingListSchema) => {
        fromData.createdAt = new Date();
        fromData.amount = Number(fromData.amount);
        fromData.savingId = props.saving.id
        await insertSavingList(fromData)
        form.reset();
        setShow(false)
        router.refresh();
    };


    return (
        <>
            {show && <section
                className="inset-0 z-[999] h-screen w-screen bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300 fixed"
            >
                <div className="flex flex-col justify-center items-center h-screen w-screen">
                    <div className="w-60 h-[20rem] bg-blue-400 rounded-md p-5">
                        <div
                            className="text-xl font-bold mb-5 text-center"
                        >Add Saving List</div>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="h-20">
                                <div className="w-full">Name</div>
                                <input
                                    {...form.register('name')}
                                    placeholder='Enter name'
                                    className="w-full rounded border-black border-2 pl-2 pr-2 text-black"
                                />
                                {form.formState.errors.name
                                    && <p
                                        className='text-red-700 text-sm'
                                    >{form.formState.errors.name.message}</p>}
                            </div>

                            <div className="h-20">
                                <div className="w-full">Amount</div>
                                <input
                                    {...form.register('amount')}
                                    type="number"
                                    placeholder='Enter Amount'
                                    className="w-full rounded border-black border-2 pl-2 pr-2 text-black"
                                />
                                {form.formState.errors.amount
                                    && <p
                                        className='text-red-700 text-sm'
                                    >{form.formState.errors.amount.message}</p>}
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
                className="mr-2 w-8 h-6 m-3">
                <FaPlus />
            </button>
        </>
    )
}

const validators = zod.object({
    name: zod.string().min(1),
    amount: zod.string(),
});
