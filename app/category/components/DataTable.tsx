'use client'
import { deleteCategory, deleteFile } from '@/app/actions/api';
import { ICategorySchema, IFilesSchema } from '@/app/actions/type';

import Table from 'react-data-table-component';
import { createTheme } from "react-data-table-component";
import { FaGlassWater } from 'react-icons/fa6';
import { useRouter } from 'next/navigation'
import { File } from '@/app/components/File';

createTheme("lifesaver", {
    text: {
        primary: 'white',
    },
    background: {
        default: 'black',
    }
})


interface IDataTable {
    categories: ICategorySchema[];
    files: IFilesSchema[];
}
export default function DataTable(props: IDataTable) {

    const router = useRouter()



    const onDelete = async (
        categoryId: string,
        fileId: string
    ) => {
        await deleteFile(fileId);
        await deleteCategory(categoryId);
        router.refresh();
    };

    return (<Table
        data={props.categories}
        theme="lifesaver"
        columns={[
            {
                name: 'Icon',
                cell: (row) => <File id={row.id} files={props.files} />
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
    />)
}