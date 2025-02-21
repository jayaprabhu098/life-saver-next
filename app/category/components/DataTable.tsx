'use client';
import { ICategorySchema, IFilesSchema } from '@/app/actions/type';
import { FaGlassWater } from 'react-icons/fa6';
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
                cell: (row) => <File id={row.icon} files={props.files} />
            },
            {
                name: 'Name',
                selector: (row) => row.name
            }, {
                name: "Action",
                cell: (row) => <button
                    onClick={() =>
                        props.onDelete(row.id, row.icon)
                    }
                ><FaGlassWater /></button>
            }
        ]}
    />);
}