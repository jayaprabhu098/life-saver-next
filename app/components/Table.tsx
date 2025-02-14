import DataTable, { TableProps } from 'react-data-table-component';
import { createTheme } from "react-data-table-component";

createTheme("lifesaver", {
    text: {
        primary: 'white',
    },
    background: {
        default: 'black',
    }
});

export default function Table<T>(props: TableProps<T>) {
    return <DataTable {...props} />;
} 