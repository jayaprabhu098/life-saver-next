import { fileMutation, mutation } from "../actions/fetch";
import { APIData, Category, FileAPIData } from "../actions/action";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';
import { useState } from "react";
import Image from 'next/image';

interface IProps {
    data: APIData;
    type: number;
    fileData: FileAPIData
    refresh: () => Promise<void>;
    setShowAdd: React.Dispatch<React.SetStateAction<boolean>>
}
export default function CategoryAdd(props: IProps) {

    const [error, setError] = useState<string | null>(null);
    const [file, setFile] = useState<string | null>(null)

    const form = useForm<Category>({
        resolver: zodResolver(validators),
    });

    const onChangeFile = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.files) {
            const reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onload = async () => {
                if (!reader.result)
                    return;
                const fileData = {
                    id: new Date().getTime(),
                    file: reader.result.toString()
                };
                const id = new Date().getTime();
                props.fileData.files.push(fileData)
                const res = await fileMutation(props.fileData);
                if (res)
                    setError(res);
                else {
                    form.setValue('icon', id);
                    setFile(fileData.file)
                }
            }
        }
    };


    const onSubmit = async (fromData: Category) => {
        const categories = props.type == 1
            ? props.data.debitCategories
            : props.data.creditCategories;
        const isNameExist = categories.some(category =>
            category.name == fromData.name
        );
        if (isNameExist)
            setError("Name Already Exist");
        else {
            if (props.type == 1)
                props.data.debitCategories.push({
                    ...fromData,
                    id: new Date().getTime()
                });
            else
                props.data.creditCategories.push({
                    ...fromData,
                    id: new Date().getTime()
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
                <div className="w-60 h-[20rem] bg-blue-400 rounded-md p-5">
                    <div
                        className="text-xl font-bold mb-5 text-center"
                    >Add {props.type == 1 ? "Expenses" : "Income"} Category</div>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="h-20">
                            <div className="flex w-full justify-start">
                                <div >Icon</div>
                                {file && <Image src={file} className="h-5 ml-4" alt="Loading..."/>}
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
    name: zod.string(),
    icon: zod.number()
});
