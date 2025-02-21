'use client'
import DataTable from "./components/DataTable";
import Toggle from "../components/Toggle";
import Add from "./components/Add";
import { useSearch } from "../components/State";
import { useEffect, useState } from "react";
import { ICategorySchema, IFilesSchema } from "../actions/type";
import * as API from "../actions/api";
import { v4 as ID } from 'uuid'

export default function Categories() {

    const { type, setType } = useSearch();
    const [files, setFiles] = useState<IFilesSchema[]>([]);
    const [categories, setCategories] = useState<ICategorySchema[]>([]);
    const [typeCategories, setTypeCategories] = useState<ICategorySchema[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const [fileRes, categoryRes] = await Promise.all([
                API.getFiles(),
                API.getCategories()
            ])
            setFiles(fileRes);
            setCategories(categoryRes);
        }
        fetch()
    }, [])

    useEffect(() => {
        if (!type)
            return;
        const typeCategories = categories.filter((category) =>
            category.type == type
        )
        setTypeCategories(typeCategories)
    }, [type, categories])


    const addFile = async (file: string) => {
        const fileId = ID()
        const _files = [...files, { file, createdAt: new Date(), id: fileId }];
        setFiles(_files)
        await API.saveFile(_files)
        return fileId
    }

    const addCategory = async (category: ICategorySchema) => {
        category.type = type;
        category.createdAt = new Date();
        category.id = ID();
        const _categories = [...categories, category]
        setCategories(_categories);
        await API.saveCategory(_categories)
    }

    const onDelete = async (
        categoryId: string,
        fileId: string
    ) => {
        const _categories = categories.filter(category =>
            category.id != categoryId
        )
        const _files = files.filter(file =>
            file.id != fileId
        )
        setCategories(_categories);
        setFiles(_files)
        await Promise.all([
            API.saveCategory(_categories),
            API.saveFile(_files)
        ])
    }

    return (
        <section className="flex flex-col">
            <Toggle type={type} setType={setType} />
            <Add type={type} addFile={addFile} addCategory={addCategory} />
            <DataTable categories={typeCategories} files={files} onDelete={onDelete} />
        </section>
    );
}