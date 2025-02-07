'use client'
import { deleteAccount, } from '@/app/actions/api';
import { IAccountSchema, ICategorySchema, IFilesSchema, } from '@/app/actions/type';
import Table from 'react-data-table-component';
import { createTheme } from "react-data-table-component";
import { FaGlassWater } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import dayjs from "dayjs";
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
    accounts: IAccountSchema[];
    categories: ICategorySchema[];
    files: IFilesSchema[]
}
export default function DataTable(props: IDataTable) {

    const router = useRouter()

    const onDelete = async (
        accountId: string,
    ) => {
        await deleteAccount(accountId);
        router.refresh();
    };

    return (<Table
        data={props.accounts}
        theme="lifesaver"
        columns={[
            {
                name: 'Category',
                cell: (row) => <File files={props.files} id={row.category} />
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
                        onDelete(row.id)
                    }
                ><FaGlassWater /></button>
            }
        ]}
    />)
}