'use client'
import { getCategories, getFiles } from "../actions/api";
import DataTable from "./components/DataTable";
import Toggle from "../components/Toggle";
import Add from "./components/Add";
import { useSearch } from "../components/State";
import { useEffect, useState } from "react";
import { ICategorySchema, IFilesSchema } from "../actions/type";

export default function Categories() {

    const { type } = useSearch();
    const [files, setFiles] = useState<IFilesSchema[]>([]);
    const [categories, setCategories] = useState<ICategorySchema[]>([]);
    console.log(type)
    useEffect(() => {
        const fetch = async () => {
            const res = await getFiles();
            setFiles(res)
        }
        fetch()
    }, [])

    useEffect(() => {
        const fetch = async () => {
            if (!type)
                return;
            const res = await getCategories(type);
            setCategories(res)
        }
        fetch()
    }, [type])

    return (
        <section className="flex flex-col">
            <Toggle />
            <Add type={type} />
            <DataTable categories={categories} files={files} />
        </section>
    );
}