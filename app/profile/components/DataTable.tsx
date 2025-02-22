'use client'
import { ISavingListSchema, ISavingSchema } from '@/app/actions/type';
import { FaGlassWater } from 'react-icons/fa6';
import Table from '@/app/components/Table';

interface IDataTable {
    savings: ISavingSchema | null;
    list: ISavingListSchema[]
    onDelete: (listId: string) => Promise<void>
}
export default function DataTable(props: IDataTable) {

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
                        props.onDelete(row.id)
                    }
                ><FaGlassWater /></button>
            }
        ]}
    />)
}