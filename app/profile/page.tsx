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
        return <div>Page not Found</div>


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
        <section className="flex flex-col ">
            <div className="flex flex-row justify-end">
                <Add addSaveList={addSaveList} />
                <Save saving={saving} updateSaving={updateSaving}/>
            </div>
            <ProcessBar saving={saving} list={savingList} />
            <DataTable savings={saving} list={savingList} onDelete={onDelete} />
        </section>
    );
}