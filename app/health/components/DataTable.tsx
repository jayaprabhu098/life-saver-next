'use client'
import { IHealthSchema, } from '@/app/actions/type';
import { FaGlassWater } from 'react-icons/fa6';
import Table from '@/app/components/Table';
import dayjs from 'dayjs';

const needWight = 70;
interface IDataTable {
    list: IHealthSchema[];
    onDelete: (healthId: string) => Promise<void>
}
export default function DataTable(props: IDataTable) {


    return (<Table
        theme="lifesaver"
        data={props.list}
        columns={[
            {
                name: 'Date',
                cell: (row) => <span>{dayjs(row.createdAt).format("DD MMM YYYY")}</span>
            },
            {
                name: 'Weight',
                selector: (row) => row.weight
            },
            {
                name: 'Reduce Weight',
                selector: (row) => row.weight - needWight
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