'use client'
import DataTable from "./components/DataTable";
import Add from './components/Add';
import { useEffect, useState } from "react";
import { IHealthSchema } from "../actions/type";
import * as API from "../actions/api";

export default function Health() {
    const [healthList, setHealthList] = useState<IHealthSchema[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await API.getHealthList();
            setHealthList(res)
        }
        fetch()
    }, [])

    return (
        <section className="flex flex-col">
            <Add />
            <DataTable list={healthList} />
        </section>
    );
}