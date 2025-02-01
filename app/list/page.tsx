'use client';
import { useEffect, useState } from "react";
import { mutation, useQuery } from "../actions/fetch";
import { List as IList } from "../actions/action";
import ListAdd from "./AddList";
import dayjs from "dayjs";
import DataTable from 'react-data-table-component';
import { FaGlassWater } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { Loader } from "../Loader";
import Line from "./Line";
import { createTheme } from "react-data-table-component";
import Image from 'next/image';

createTheme("lifesaver", {
    text: {
        primary: 'white',
    },
    background: {
        default: 'black',
    }
});

export default function List() {
    const { data, error, loading, refresh, fileData } = useQuery();
    const [type, setType] = useState<number>(1);
    const [list, setList] = useState<IList[]>([]);
    const [month, setMonth] = useState(dayjs().format("YYYY-MM"));
    const [showAdd, setShowAdd] = useState(false);
    const [prideCount, setPrideCount] = useState({
        day: 0,
        week: 0,
        month: 0
    });

    const onDelete = async (id: number) => {
        if (!data)
            return;
        if (type === 1) {
            data.debitList = data.debitList.filter(category =>
                category.id !== id
            );
            setList(data.debitList);
        }
        else {
            data.creditList = data.creditList.filter(category =>
                category.id !== id
            );
            setList(data.creditList);
        }
        await mutation(data);
    };

    useEffect(() => {
        if (data) {
            const filteredList = type === 1 ? data.debitList : data.creditList;
            const dateFiltered = filteredList.filter(fList =>
                dayjs(fList.date).format("YYYY-MM") === month
            );
            setList(dateFiltered);
            const prideCountObj = {
                day: 0,
                week: 0,
                month: 0
            };
            filteredList.forEach(fList => {
                if (dayjs(fList.date).isSame(dayjs(), 'day'))
                    prideCountObj.day += fList.amount;
                if (dayjs(fList.date).isSame(dayjs(), 'month'))
                    prideCountObj.week += fList.amount;
                if (dayjs(fList.date).isSame(dayjs(), 'month'))
                    prideCountObj.month += fList.amount;
            });
            setPrideCount(prideCountObj);
        }
    }, [type, data, month]);


    const findFile = (id: number) => {
        const fFile = fileData?.files.find(file =>
            file.id === id
        );
        if (!fFile)
            return;
        return <Image src={fFile.file} alt="Loading" width={30} height={30} />;
    };

    if (loading)
        return <Loader />;

    if (error)
        return <p>Internal error: {error}</p>;

    return (
        <section className="flex flex-col">
            {showAdd && data && fileData && <ListAdd
                data={data}
                type={type}
                fileData={fileData}
                refresh={refresh}
                setShowAdd={setShowAdd}
            />}

            <div className="flex justify-center mt-5">
                <div onClick={() => setType(1)} className={`w-24 h-10 pl-4 pt-2 rounded-md ${type == 1 ? 'bg-blue-400' : 'bg-slate-400'}`}>Expenses</div>
                <div onClick={() => setType(2)} className={`ml-2 w-24 h-10 pl-5 pt-2 rounded-md ${type == 2 ? 'bg-blue-400' : 'bg-slate-400'}`}>Income</div><br />
            </div>

            <div className="self-end mt-5">
                <input
                    type="month"
                    onChange={(e) => setMonth(e.target.value)}
                    className="mr-10 text-white bg-slate-500 rounded-xl p-2"
                    value={month}
                />
                <button
                    onClick={() => setShowAdd(true)}
                    className="mr-10 w-16 h-6 pt-2">
                    <FaPlus />
                </button>
            </div>

            <div className="flex justify-center w-[22rem] h-80 align-center m-auto">
                <Line
                    list={list}
                    total={prideCount.month}
                />
            </div>

            <div className="flex justify-center m-5">
                <div>
                    <div>Day</div>
                    <div>₹{prideCount.day}</div>
                </div>
                <div className="ml-5">
                    <div>Week</div>
                    <div>₹{prideCount.week}</div>
                </div>
                <div className="ml-5">
                    <div>Month</div>
                    <div>₹{prideCount.month}</div>
                </div>
            </div>

            <DataTable
                data={list}
                theme="lifesaver"
                columns={[
                    {
                        name: 'Category',
                        cell: (row) => <div className="flex">
                            {findFile(row.category.icon)}
                            <span className="ml-2 mt-2">{row.category.name}</span>
                        </div>
                    },
                    {
                        name: 'comment',
                        selector: (row) => row.comment ?? ''
                    },
                    {
                        name: 'Amount',
                        selector: (row) => row.amount
                    },
                    {
                        name: 'Date',
                        cell: (row) => <span className="mw-20">{dayjs(row.date).format("DD MMM YYYY, HH:mm A")}</span>
                    },
                    {
                        name: "Action",
                        cell: (row) => <button
                            onClick={() =>
                                onDelete(row.id)
                            }
                        ><FaGlassWater /></button>
                    }
                ]}
            />
        </section>
    );
}