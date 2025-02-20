'use client'
import { ISavingListSchema, ISavingSchema } from '@/app/actions/type';
import { FaGlassWater } from 'react-icons/fa6';
import { deleteList } from '@/app/actions/db';
import Table from '@/app/components/Table';

interface IDataTable {
    savings: ISavingSchema | null;
    list: ISavingListSchema[]
}
export default function DataTable(props: IDataTable) {

    const onDelete = async (
        listId: string,
    ) => {
        await deleteList(listId);
        window.location.reload()
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