'use client'
import { useEffect, useState } from "react";
import { getSaving, getSavingList } from "../actions/db";
import Add from "./components/Add";
import DataTable from "./components/DataTable";
import { ProcessBar } from "./components/ProcessBar";
import Save from "./components/Save";
import { ISavingListSchema, ISavingSchema } from "../actions/type";

export default function Profile() {
    const [saving, setSaving] = useState<ISavingSchema | null>(null);
    const [savingList, setSavingList] = useState<ISavingListSchema[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const savingRes = await getSaving();
            if (savingRes) {
                const listRes = await getSavingList(savingRes.id)
                setSavingList(listRes);
                setSaving(savingRes)
            }
        }
        fetch()
    }, [])

    if (!saving)
        return <div>Page not Found</div>

    return (
        <section className="flex flex-col ">
            <div className="flex flex-row justify-end">
                <Add saving={saving} />
                <Save saving={saving} />
            </div>
            <ProcessBar saving={saving} list={savingList} />
            <DataTable savings={saving} list={savingList} />
        </section>
    );
}