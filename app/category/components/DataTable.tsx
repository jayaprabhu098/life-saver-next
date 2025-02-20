'use client';
import { ICategorySchema, IFilesSchema } from '@/app/actions/type';
import { FaGlassWater } from 'react-icons/fa6';
import { File } from '@/app/components/File';
import Table from '@/app/components/Table';
import * as API from '@/app/actions/api';
interface IDataTable {
    categories: ICategorySchema[];
    files: IFilesSchema[];
}
export default function DataTable(props: IDataTable) {


    const onDelete = async (
        categoryId: string,
        fileId: string
    ) => {
        await API.deleteFile(fileId);
        await API.deleteCategory(categoryId);
        window.location.reload();
    };

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
                        onDelete(row.id, row.icon)
                    }
                ><FaGlassWater /></button>
            }
        ]}
    />);
}