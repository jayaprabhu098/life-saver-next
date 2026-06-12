'use client'
import { IHealthSchema, } from '@/app/actions/type';
import { FaTrash } from 'react-icons/fa';
import Table from '@/app/components/Table';
import dayjs from 'dayjs';

const needWight = 70;
interface IDataTable {
    list: IHealthSchema[];
    onDelete: (healthId: string) => Promise<void>
}
export default function DataTable(props: IDataTable) {


    return (<Table
        theme="lifesaver"
        data={props.list}
        columns={[
            {
                name: 'Date',
                cell: (row) => <span className="text-zinc-500 dark:text-zinc-400 font-medium">{dayjs(row.createdAt).format("DD MMM YYYY")}</span>
            },
            {
                name: 'Weight',
                selector: (row) => row.weight,
                cell: (row) => <span className="font-extrabold text-zinc-900 dark:text-zinc-50">{row.weight} kg</span>
            },
            {
                name: 'Target Delta (70kg)',
                selector: (row) => row.weight - needWight,
                cell: (row) => {
                    const diff = row.weight - needWight;
                    return diff <= 0 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-400">
                            {diff.toFixed(2)} kg
                        </span>
                    ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-500/15 text-rose-800 dark:text-rose-450">
                            - {diff.toFixed(2)} kg
                        </span>
                    );
                }
            },    
            // {
            //     name: "Action",
            //     cell: (row) => (
            //         <button
            //             onClick={() => props.onDelete(row.id)}
            //             className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
            //             title="Delete log"
            //         >
            //             <FaTrash className="w-3.5 h-3.5" />
            //         </button>
            //     )
            // }
        ]}
    />)
}