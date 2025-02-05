'use client'
import { deleteCategory, deleteFile } from '@/app/actions/api';
import { ICategorySchema, IFilesSchema } from '@/app/actions/type';
import Image from 'next/image';
import Table from 'react-data-table-component';
import { createTheme } from "react-data-table-component";
import { FaGlassWater } from 'react-icons/fa6';
import { useRouter } from 'next/navigation'

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

    const findFile = (id: string) => {
        const fFile = props.files.find(file =>
            file.id === id
        );
        if (!fFile)
            return;
        return <Image src={fFile.file} alt="Loading" width={30} height={30} />;
    };

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
                cell: (row) => <span>
                    {findFile(row.icon)}
                </span>
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