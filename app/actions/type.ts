
export enum TableName {
    file = 'files',
    saving = 'savings',
    category = 'categories',
    account = 'accounts',
}

export enum CategoryType {
    debit = 1,
    credit,
}

export interface IFilesSchema {
    id: string;
    file: string;
    createdAt: Date;
}

export interface ISavingSchema {
    id: string;
    name: string;
    amount: number;
    target: number;
}

export interface ICategorySchema {
    id: string;
    name: string;
    icon: number;
    type: CategoryType;
    createdAt: Date;
}

export interface IAccountSchema {
    id: string;
    category: string;
    comment: string | null;
    createdAt: Date;
    amount: number;
    type: CategoryType;
}

export interface IListAdd {
    category: string;
    comment: string | null;
    date: Date;
    amount: number;
}

export interface ISavingAdd {
    name: string;
    type: string;
    amount: number;
}

