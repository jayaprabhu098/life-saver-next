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
        <section className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col">
            {/* Header block */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-700 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent uppercase">
                        Category Directory
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Configure customized expense and income categories.
                    </p>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-3xl px-6 py-2 shadow-sm mb-8">
                <div className="flex-1">
                    <Toggle type={type} setType={setType} />
                </div>
                <div>
                    <Add type={type} addFile={addFile} addCategory={addCategory} />
                </div>
            </div>

            {/* Table */}
            <div className="mb-8">
                <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">Available Categories</p>
                <DataTable categories={typeCategories} files={files} onDelete={onDelete} />
            </div>
        </section>
    );
}