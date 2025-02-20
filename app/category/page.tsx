'use client'
import DataTable from "./components/DataTable";
import Toggle from "../components/Toggle";
import Add from "./components/Add";
import { useSearch } from "../components/State";
import { useEffect, useState } from "react";
import { ICategorySchema, IFilesSchema } from "../actions/type";
import * as API from "../actions/api";

export default function Categories() {

    const { type, setType } = useSearch();
    const [files, setFiles] = useState<IFilesSchema[]>([]);
    const [categories, setCategories] = useState<ICategorySchema[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await API.getFiles();
            setFiles(res)
        }
        fetch()
    }, [])

    useEffect(() => {
        const fetch = async () => {
            if (!type)
                return;
            const res = await API.getCategories(type);
            setCategories(res)
        }
        fetch()
    }, [type])

    return (
        <section className="flex flex-col">
            <Toggle type={type} setType={setType} />
            <Add type={type} />
            <DataTable categories={categories} files={files} />
        </section>
    );
}