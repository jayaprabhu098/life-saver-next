import DataTable, { TableProps } from 'react-data-table-component';
import { createTheme } from "react-data-table-component";

createTheme("lifesaver", {
    text: {
        primary: 'var(--foreground)',
        secondary: 'var(--text-muted)',
    },
    background: {
        default: 'transparent',
    },
    divider: {
        default: 'var(--card-border)',
    },
});

const customStyles = {
    table: {
        style: {
            backgroundColor: 'transparent',
        },
    },
    headRow: {
        style: {
            backgroundColor: 'var(--card-bg)',
            borderBottomWidth: '1px',
            borderBottomColor: 'var(--card-border)',
            minHeight: '48px',
            borderTopLeftRadius: '0.75rem',
            borderTopRightRadius: '0.75rem',
        },
    },
    headCells: {
        style: {
            fontSize: '12px',
            fontWeight: '700',
            color: 'var(--text-muted)',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.05em',
        },
    },
    rows: {
        style: {
            minHeight: '52px',
            backgroundColor: 'transparent',
            borderBottomWidth: '1px',
            borderBottomColor: 'var(--card-border)',
            color: 'var(--foreground)',
            transition: 'background-color 0.15s ease',
            '&:hover': {
                backgroundColor: 'rgba(99, 102, 241, 0.05)',
            },
        },
    },
    cells: {
        style: {
            fontSize: '14px',
            color: 'var(--foreground)',
        },
    },
    pagination: {
        style: {
            backgroundColor: 'transparent',
            color: 'var(--text-muted)',
            borderTopWidth: '1px',
            borderTopColor: 'var(--card-border)',
        },
    },
};

export default function Table<T>(props: TableProps<T>) {
    return (
        <div className="w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-1 shadow-sm mt-4">
            <DataTable 
                theme="lifesaver" 
                customStyles={customStyles}
                {...props} 
            />
        </div>
    );
} 