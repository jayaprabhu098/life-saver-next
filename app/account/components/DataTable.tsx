'use client'
import { deleteAccount, } from '@/app/actions/db.g';
import { IAccountSchema, ICategorySchema, IFilesSchema, } from '@/app/actions/type';
import { FaGlassWater } from 'react-icons/fa6';
import dayjs from "dayjs";
import { File } from '@/app/components/File';
import Table from '@/app/components/Table';

interface IDataTable {
    accounts: IAccountSchema[];
    categories: ICategorySchema[];
    files: IFilesSchema[]
}
export default function DataTable(props: IDataTable) {

    const onDelete = async (
        accountId: string,
    ) => {
        await deleteAccount(accountId);
        window.location.reload()
    };

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
                cell: (row) => <File files={props.files} id={findCategory(row.category)} />
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