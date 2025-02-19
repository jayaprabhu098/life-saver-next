'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';
import { useState } from "react";
import Image from 'next/image';
import { FaPlus } from "react-icons/fa";
import { ICategorySchema } from "@/app/actions/type";
import { insertCategory, insertFile } from "@/app/actions/api";

interface IProps {
    type: number;
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
                const id = await insertFile(file)
                form.setValue('icon', id);
                setFile(file)
            }
        }
    };


    const onSubmit = async (fromData: ICategorySchema) => {
        fromData.type = props.type;
        fromData.createdAt = new Date();
        await insertCategory(fromData);
        form.reset();
        setFile(null);
        setShow(false);
        window.location.reload()
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
                        >Add {props.type == 1 ? "Expenses" : "Income"} Category</div>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="h-20">
                                <div className="flex w-full justify-start">
                                    <div >Icon</div>
                                    {file && <Image src={file} className="h-5" alt="Loading..." width={30} height={30} />}
                                </div>
                                <input
                                    type="file"
                                    accept="image/png"
                                    onChange={onChangeFile}
                                />
                                {form.formState.errors.icon
                                    && <p
                                        className='text-red-700 text-sm'
                                    >{form.formState.errors.icon.message}</p>}
                            </div>

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
    )
}

const validators = zod.object({
    name: zod.string(),
    icon: zod.string()
});
