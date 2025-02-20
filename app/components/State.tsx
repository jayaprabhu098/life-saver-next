'use client';
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getStartDateAndEndDate } from "../actions/date";

export function useSearch() {
    const [type, setType] = useState(1);
    const [month, setMonth] = useState(dayjs().get("month") + 1);
    const [year, setYear] = useState(dayjs().get("year"));
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();


    useEffect(() => {
        const date = getStartDateAndEndDate(month, year);
        setStartDate(date.startDate);
        setEndDate(date.endDate)
    }, [month, year])



    return {
        type,
        startDate,
        endDate,
        setType,
        month,
        setMonth,
        year,
        setYear
    }

}