'use client'
import { deleteCategory, deleteFile } from '@/app/actions/api';
import { IAccountSchema, ICategorySchema, IFilesSchema, } from '@/app/actions/type';
import Table from 'react-data-table-component';
import { createTheme } from "react-data-table-component";
import { FaGlassWater } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import dayjs from "dayjs";
import Image from 'next/image';

createTheme("lifesaver", {
    text: {
        primary: 'white',
    },
    background: {
        default: 'black',
    }
})

interface IDataTable {
    accounts: IAccountSchema[];
    categories: ICategorySchema[];
    files: IFilesSchema[]
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

    const findFile = (categoryId: string) => {
        const fCategory = props.categories.find(category => category.id == categoryId);
        if(!fCategory)
            return;
        const fFile = props.files.find(file =>
            file.id === fCategory.icon
        );
        if (!fFile)
            return;
        return <Image src={fFile.file} alt="Loading" width={30} height={30} />;
    };

    return (<Table
        data={props.accounts}
        theme="lifesaver"
        columns={[
            {
                name: 'Category',
                cell: (row) => <div className="flex">
                    {findFile(row.category)}
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
                cell: (row) => <span className="mw-20">{dayjs(row.createdAt).format("DD MMM YYYY, HH:mm A")}</span>
            },
            {
                name: "Action",
                cell: (row) => <button
                    onClick={() =>
                        // onDelete(row.id)
                        console.log(row.id)
                    }
                ><FaGlassWater /></button>
            }
        ]}
    />)
}