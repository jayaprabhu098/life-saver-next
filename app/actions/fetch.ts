'use client'
import { useEffect, useState } from "react";
import { API, APIData, FileAPIData, HealthAPIData } from "./action";

export function useQuery() {

    const [data, setData] = useState<APIData | undefined>();
    const [fileData, setFileData] = useState<FileAPIData | undefined>();
    const [healthData, setHealthData] = useState<HealthAPIData | undefined>();
    const [error, setError] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);

    const refresh = async () => {
        try {
            const response = await API.getData();
            response.data.creditList.sort((a, b) => a.date.getTime() - b.date.getTime() ? 1 : -1)
            response.data.debitList.sort((a, b) => a.date.getTime() - b.date.getTime() ? 1 : -1)
            setData(response.data);
            setFileData(response.fileData);
            setHealthData(response.healthData)
        } catch (err) {
            setError((err as { message: string; }).message);
        }
    };

    useEffect(() => {
        (
            async function () {
                try {
                    setLoading(true);
                    const response = await API.getData();
                    setData(response.data);
                    setFileData(response.fileData);
                    setHealthData(response.healthData)
                } catch (err) {
                    setError((err as { message: string; }).message);
                } finally {
                    setLoading(false);
                }
            }
        )();
    }, []);

    return {
        data,
        error,
        loading,
        refresh,
        fileData,
        healthData,
        setError
    };

}


export async function mutation(data: APIData) {
    try {
        await API.saveData(data);
    } catch (err) {
        return (err as { message: string; }).message;
    }
}

export async function fileMutation(data: FileAPIData) {
    try {
        await API.saveFile(data);
    } catch (err) {
        return (err as { message: string; }).message;
    }
}

export async function fileHealth(data: HealthAPIData) {
    try {
        await API.saveHealthList(data);
    } catch (err) {
        return (err as { message: string; }).message;
    }
}