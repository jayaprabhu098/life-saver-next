export enum TableName {
  file = 'files',
  saving = 'savings',
  savingList = 'savingList',
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

export interface ISavingListSchema {
  id: string;
  name: string;
  amount: number;
  createdAt: Date;
  savingId: string;
}

export interface ISavingSchema {
  id: string;
  name: string;
  target: number;
}

export interface ICategorySchema {
  id: string;
  name: string;
  icon: string;
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
