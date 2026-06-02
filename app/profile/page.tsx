'use client'
import { useEffect, useState } from "react";
import * as API from '../actions/api'
import Add from "./components/Add";
import DataTable from "./components/DataTable";
import { ProcessBar } from "./components/ProcessBar";
import Save from "./components/Save";
import { ISavingListSchema, ISavingSchema } from "../actions/type";
import { v4 as ID } from 'uuid'

export default function Profile() {
    const [saving, setSaving] = useState<ISavingSchema | null>(null);
    const [savingList, setSavingList] = useState<ISavingListSchema[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const savingRes = await API.getSaving();
            if (savingRes) {
                const listRes = await API.getSavingList()
                setSavingList(listRes);
                setSaving(savingRes)
            }
        }
        fetch()
    }, [])

    if (!saving)
        return (
            <section className="w-full max-w-md mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
                <div className="p-4 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl mb-6 shadow-sm text-zinc-400">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                </div>
                <h1 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">Profile Not Found</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-xs font-semibold leading-relaxed">It seems your savings target profile hasn't been initialized yet.</p>
            </section>
        );


    const onDelete = async (
        listId: string,
    ) => {
        const _savingList = savingList.filter(_saving =>
            _saving.id != listId
        )
        setSavingList(_savingList)
        await API.saveSavingList(_savingList);
    };

    const addSaveList = async (list: ISavingListSchema) => {
        list.createdAt = new Date();
        list.amount = Number(list.amount);
        list.savingId = saving.id;
        list.id = ID();
        const _savingList = [...savingList, list]
        setSavingList(_savingList);
        await API.saveSavingList(_savingList);
    }

    const updateSaving = async (list: ISavingSchema) => {
        list.target = Number(list.target);
        setSaving(list)
        await API.updateSaving(list);
    }

    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col">
            {/* Header block */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-700 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent uppercase">
                        Savings Goals
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Track progress towards your target goals and contribution deposits.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Add addSaveList={addSaveList} />
                    <Save saving={saving} updateSaving={updateSaving}/>
                </div>
            </div>

            {/* Savings Goal Summary & Process Bar */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm mb-8">
                <ProcessBar saving={saving} list={savingList} />
            </div>

            {/* Table */}
            <div className="mb-8">
                <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">Contribution Records</p>
                <DataTable savings={saving} list={savingList} onDelete={onDelete} />
            </div>
        </section>
    );
}