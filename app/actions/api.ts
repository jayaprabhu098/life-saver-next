'use server';
import { createClient, RedisClientType } from 'redis';
import * as Type from "./type";

let redis: RedisClientType | null = null;

export const getDB = async () => {
  if (!redis) {
    redis = createClient({ url: "redis://default:COrdXS3PDg3Q4SBasqlLg7vd6da0Kfzq@redis-15119.c301.ap-south-1-1.ec2.redns.redis-cloud.com:15119" });
    await redis.connect();
  }
  return redis;
};

export const find = async <T>(key: string) => {
  const db = await getDB();
  const data = await db.get(key);
  const paredData = data ? JSON.parse(data) : [];
  return paredData as T[];
};

export const save = async <T>(key: string, value: T[]) => {
  const db = await getDB();
  const _value = JSON.stringify(value);
  await db.set(key, _value);
};

export const getFiles = async (): Promise<Type.IFilesSchema[]> => {
  const files = await find<Type.IFilesSchema>(Type.TableName.file)
  sortColumn(files)
  return files;
};

export const saveFile = async (
  files: Type.IFilesSchema[],
): Promise<void> => {
  await save<Type.IFilesSchema>(Type.TableName.file, files);
};

export const saveCategory = async (
  categories: Type.ICategorySchema[]
): Promise<void> => {
  await save<Type.ICategorySchema>(Type.TableName.category, categories);
};

export const getCategories = async (

): Promise<Type.ICategorySchema[]> => {
  const categories = await find<Type.ICategorySchema>(Type.TableName.category)
  sortColumn(categories)
  return categories;
};

export const saveHealth = async (
  list: Type.IHealthSchema[]
): Promise<void> => {
  await save<Type.IHealthSchema>(Type.TableName.health, list);
};

export const getHealthList = async (): Promise<Type.IHealthSchema[]> => {
  const healthList = await find<Type.IHealthSchema>(Type.TableName.health)
  sortColumn(healthList)
  return healthList;
};

export const saveAccount = async (
  accounts: Type.IAccountSchema[]
): Promise<void> => {
  await save<Type.IAccountSchema>(Type.TableName.account, accounts);
};

export const getAccounts = async () => {
  const accounts = await find<Type.IAccountSchema>(Type.TableName.account)
  sortColumn(accounts)
  return accounts;
};

export const updateSaving = async (saving: Type.ISavingSchema): Promise<void> => {
  await save<Type.ISavingSchema>(Type.TableName.saving, [saving]);
};

export const getSaving = async (): Promise<Type.ISavingSchema | null> => {
  const [saving] = await find<Type.ISavingSchema>(Type.TableName.saving)
  return saving;
};

export const saveSavingList = async (list: Type.ISavingListSchema[]): Promise<void> => {
  await save<Type.ISavingListSchema>(Type.TableName.savingList, list);
};

export const getSavingList = async (): Promise<Type.ISavingListSchema[]> => {
  const savingList = await find<Type.ISavingListSchema>(Type.TableName.savingList)
  sortColumn(savingList)
  return savingList;
};

const sortColumn = (list: Array<{ createdAt: Date }>) => {
  list.sort((a, b) => {
    a.createdAt = new Date(a.createdAt)
    b.createdAt = new Date(b.createdAt)
    return a.createdAt.getTime() < b.createdAt.getTime()
      ? 1 : -1
  })

}