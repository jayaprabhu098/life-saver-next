'use client'
import { IAccountSchema, ICategorySchema, IFilesSchema, } from '@/app/actions/type';
import { FaTrash } from 'react-icons/fa';
import dayjs from "dayjs";
import { File } from '@/app/components/File';
import Table from '@/app/components/Table';

interface IDataTable {
    accounts: IAccountSchema[];
    categories: ICategorySchema[];
    files: IFilesSchema[]
    onDelete: (accountId: string) => Promise<void>
}
export default function DataTable(props: IDataTable) {

    const findCategory = (id: string) => {
        const fCategory = props.categories.find((category => category.id === id));
        return fCategory?.icon ?? ''
    }

    return (<Table
        data={props.accounts}
        theme="lifesaver"
        columns={[
            {
                name: 'Category',
                cell: (row) => (
                    <div className="flex items-center justify-center p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg w-9 h-9">
                        <File files={props.files} id={findCategory(row.category)} />
                    </div>
                )
            },
            {
                name: 'Comment',
                selector: (row) => row.comment ?? '',
                cell: (row) => <span className="text-zinc-700 dark:text-zinc-300 font-semibold">{row.comment || '—'}</span>
            },
            {
                name: 'Amount',
                selector: (row) => row.amount,
                cell: (row) => <span className="font-extrabold text-zinc-900 dark:text-zinc-50">₹{new Intl.NumberFormat('en-IN').format(row.amount)}</span>
            },
            {
                name: 'Date',
                cell: (row) => <span className="text-zinc-500 dark:text-zinc-400 font-medium">{dayjs(row.createdAt).format("DD MMM YYYY, hh:mm A")}</span>
            },
            {
                name: "Action",
                cell: (row) => (
                    <button
                        onClick={() => props.onDelete(row.id)}
                        className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Delete entry"
                    >
                        <FaTrash className="w-3.5 h-3.5" />
                    </button>
                )
            }
        ]}
    />)
}