'use client'
import DataTable from "./components/DataTable";
import Add from './components/Add';
import { useEffect, useState } from "react";
import { IHealthSchema } from "../actions/type";
import * as API from "../actions/api";
import { v4 as ID } from 'uuid'

export default function Health() {
    const [healthList, setHealthList] = useState<IHealthSchema[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await API.getHealthList();
            setHealthList(res.reverse())
        }
        fetch()
    }, [])

    const addHealth = async (health: IHealthSchema) => {
        health.createdAt = new Date();
        health.weight = Number(parseFloat(health.weight.toString()).toFixed(2));
        health.id = ID();
        const _healthList = [...healthList, health]
        setHealthList(_healthList)
        await API.saveHealth(_healthList);
    }

    const onDelete = async (
        healthId: string,
    ) => {
        const _healthList = healthList.filter(health => 
            health.id != healthId
        )
        setHealthList(_healthList)
        await API.saveHealth(_healthList);
    };

    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col">
            {/* Header controls block */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-700 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent uppercase">
                        Health Tracker
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Monitor your weight logs and target reduction progress.
                    </p>
                </div>
                <div>
                    <Add addHealth={addHealth} />
                </div>
            </div>

            {/* Table */}
            <div className="mb-8">
                <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">Weight Log History</p>
                <DataTable list={healthList} onDelete={onDelete} />
            </div>
        </section>
    );
}