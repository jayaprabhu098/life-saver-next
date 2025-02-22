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
            setHealthList(res)
        }
        fetch()
    }, [])

    const addHealth = async (health: IHealthSchema) => {
        health.createdAt = new Date();
        health.weight = Number(health.weight);
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
        <section className="flex flex-col">
            <Add addHealth={addHealth} />
            <DataTable list={healthList} onDelete={onDelete} />
        </section>
    );
}