'use client';
import { ICategorySchema, IFilesSchema } from '@/app/actions/type';
import { FaTrash } from 'react-icons/fa';
import { File } from '@/app/components/File';
import Table from '@/app/components/Table';

interface IDataTable {
    categories: ICategorySchema[];
    files: IFilesSchema[];
    onDelete: (categoryId: string, fileId: string) => Promise<void>
}
export default function DataTable(props: IDataTable) {

    return (<Table
        data={props.categories}
        theme="lifesaver"
        columns={[
            {
                name: 'Icon',
                cell: (row) => (
                    <div className="flex items-center justify-center p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg w-9 h-9">
                        <File id={row.icon} files={props.files} />
                    </div>
                )
            },
            {
                name: 'Name',
                selector: (row) => row.name,
                cell: (row) => <span className="font-semibold text-zinc-800 dark:text-zinc-200">{row.name}</span>
            }, {
                name: "Action",
                cell: (row) => (
                    <button
                        onClick={() => props.onDelete(row.id, row.icon)}
                        className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Delete category"
                    >
                        <FaTrash className="w-3.5 h-3.5" />
                    </button>
                )
            }
        ]}
    />);
}