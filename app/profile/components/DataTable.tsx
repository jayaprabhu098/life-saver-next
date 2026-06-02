'use client'
import { ISavingListSchema, ISavingSchema } from '@/app/actions/type';
import { FaTrash } from 'react-icons/fa';
import Table from '@/app/components/Table';

interface IDataTable {
    savings: ISavingSchema | null;
    list: ISavingListSchema[]
    onDelete: (listId: string) => Promise<void>
}
export default function DataTable(props: IDataTable) {

    return (<Table
        theme="lifesaver"
        data={props.list}
        columns={[
            {
                name: 'Amount',
                cell: (row) => <span className="font-extrabold text-zinc-900 dark:text-zinc-50">₹{new Intl.NumberFormat('en-IN').format(row.amount)}</span>
            },
            {
                name: 'Source / Name',
                cell: (row) => <span className="font-semibold text-zinc-700 dark:text-zinc-300">{row.name}</span>
            },
            {
                name: "Action",
                cell: (row) => (
                    <button
                        onClick={() => props.onDelete(row.id)}
                        className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Delete deposit"
                    >
                        <FaTrash className="w-3.5 h-3.5" />
                    </button>
                )
            }
        ]}
    />)
}