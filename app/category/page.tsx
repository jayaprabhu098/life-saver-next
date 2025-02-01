"use client"
import { useEffect, useState } from "react";
import { fileMutation, mutation, useQuery } from "../actions/fetch";
import { Category } from "../actions/action";
import CategoryAdd from "./CategoryAdd";
import DataTable from 'react-data-table-component';
import { FaGlassWater } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { Loader } from "../Loader";
import { createTheme } from "react-data-table-component";
import Image from 'next/image';

createTheme("lifesaver", {
    text: {
        primary: 'white',
    },
    background: {
        default: 'black',
    }
})

export default function Categories() {
    const { data, error, loading, refresh, fileData } = useQuery();
    const [type, setType] = useState<number>(1);
    const [list, setList] = useState<Category[]>([]);
    const [showAdd, setShowAdd] = useState(false);

    const onDelete = async (
        id: number,
        iconId: number
    ) => {
        if (!data || !fileData)
            return;
        if (type === 1) {
            data.debitCategories = data.debitCategories.filter(category =>
                category.id !== id
            );
            setList(data.debitCategories);
        }
        else {
            data.creditCategories = data.creditCategories.filter(category =>
                category.id !== id
            );
            setList(data.creditCategories);
        }
        fileData.files = fileData.files.filter(file =>
            file.id !== iconId
        );
        await mutation(data);
        await fileMutation(fileData);
    };

    const findFile = (id: number) => {
        const fFile = fileData?.files.find(file =>
            file.id === id
        );
        if (!fFile)
            return;
        return <Image src={fFile.file} className="h-5" alt="Loading..."  width={30} height={30} />;
    }

    useEffect(() => {
        if (data)
            setList(type === 1 ? data.debitCategories : data.creditCategories);
    }, [type, data,]);

    if (loading)
        return <Loader />;

    if (error)
        return <p>Internal error: {error}</p>;

    return (
        <section className="flex flex-col">
            {showAdd && data && fileData && <CategoryAdd
                data={data}
                type={type}
                fileData={fileData}
                refresh={refresh}
                setShowAdd={setShowAdd}
            />}
            <div className="flex justify-center mt-5">
                <div onClick={() => setType(1)} className={`w-24 h-10 pl-4 pt-2 rounded-md ${type == 1 ? 'bg-blue-400' : 'bg-slate-400'}`}>Expenses</div>
                <div onClick={() => setType(2)} className={`ml-2 w-24 h-10 pl-5 pt-2 rounded-md ${type == 2 ? 'bg-blue-400' : 'bg-slate-400'}`}>Income</div><br />
            </div>
            <button
                onClick={() => setShowAdd(true)}
                className="self-end mr-2 w-16 h-6 m-3">
                <FaPlus />
            </button>
            <DataTable
                data={list}
                theme="lifesaver"
                columns={[
                    {
                        name: 'Icon',
                        cell: (row) => <span>
                            {findFile(row.icon)}
                        </span>
                    },
                    {
                        name: 'Name',
                        selector: (row) => row.name
                    }, {
                        name: "Action",
                        cell: (row) => <button
                            onClick={() =>
                                onDelete(row.id, row.icon)
                            }
                        ><FaGlassWater /></button>
                    }
                ]}
            />
        </section>
    );
}