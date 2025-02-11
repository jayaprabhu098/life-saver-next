'use client'
import { ISavingListSchema, ISavingSchema } from '@/app/actions/type';
import Table from 'react-data-table-component';
import { createTheme } from "react-data-table-component";
import { FaGlassWater } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { deleteList } from '@/app/actions/api';

createTheme("lifesaver", {
    text: {
        primary: 'white',
    },
    background: {
        default: 'black',
    }
})

interface IDataTable {
    savings: ISavingSchema | null;
    list: ISavingListSchema[]
}
export default function DataTable(props: IDataTable) {

    const router = useRouter()

    const onDelete = async (
        listId: string,
    ) => {
        await deleteList(listId);
        router.refresh();
    };

    return (<Table
        theme="lifesaver"
        data={props.list}
        columns={[
            {
                name: 'Amount',
                cell: (row) => new Intl.NumberFormat('en-IN').format(row.amount)
            },
            {
                name: 'name',
                cell: (row) => <span className="mw-20">{row.name}</span>
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