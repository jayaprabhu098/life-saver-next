'use server';
import { createClient, RedisClientType } from 'redis';
import * as Type from "./type";

let redis: RedisClientType | null = null;

export const getDB = async () => {
  if (!redis) {
    redis = createClient({ url: "redis://default:uwA4u8YtlA4gpiJhIhy7mb9hAldCSOlO@redis-19658.crce179.ap-south-1-1.ec2.redns.redis-cloud.com:19658" });
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
  return categories;
};

// export const saveHealth = async (
//   list: Type.IHealthSchema[],
//   health: Type.IHealthSchema
// ): Promise<void> => {
//   const id = ID()
//   list.push({ ...health, id });
//   await save<Type.IHealthSchema>(Type.TableName.health, list);
// };

// export const getHealthList = async (): Promise<Type.IHealthSchema[]> => {
//   const healthList = await find<Type.IHealthSchema>(Type.TableName.health)
//   return healthList;
// };

// export const saveAccount = async (
//   accounts: Type.IAccountSchema[],
//   account: Type.IAccountSchema
// ): Promise<void> => {
//   const id = ID()
//   accounts.push({ ...account, id });
//   await save<Type.IAccountSchema>(Type.TableName.account, accounts);
// };

export const getAccounts = async () => {
  const accounts = await find<Type.IAccountSchema>(Type.TableName.account)
  return accounts;
};

// export const updateSaving = async (saving: Type.ISavingSchema): Promise<void> => {
//   const db = await getDB();
//   const id = new ObjectId(saving.id);
//   formatInsert(saving);
//   await db.collection(Type.TableName.saving).updateOne({ _id: id }, saving);
// };

// export const getSaving = async (): Promise<Type.ISavingSchema | null> => {
//   const db = await getDB();
//   const savings = await db.collection(Type.TableName.saving).findOne<Type.ISavingSchema>({});
//   return documentIdFormatter(savings);
// };

// export const insertSavingList = async (list: Type.ISavingListSchema): Promise<void> => {
//   const db = await getDB();
//   formatInsert(list);
//   await db.collection(Type.TableName.savingList).insertOne(list);
// };

// export const getSavingList = async (): Promise<Type.ISavingListSchema[]> => {
//   const db = await getDB();
//   const list = await db.collection(Type.TableName.savingList)
//     .find<Type.ISavingListSchema>({})
//     .sort('createdAt', -1)
//     .toArray();
//   return documentIdFormatter(list);
// };

// export const deleteSavingList = async (id: string): Promise<void> => {
//   const db = await getDB();
//   await db.collection(Type.TableName.savingList).deleteOne({ _id: new ObjectId(id) });
// };

