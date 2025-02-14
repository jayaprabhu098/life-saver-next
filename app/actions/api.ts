'use server';
import { MongoClient, ObjectId } from "mongodb";
import * as Type from "./type";

let client: MongoClient | null = null;
export const getDB = async () => {
  if (!client) {
    client = new MongoClient("mongodb+srv://test2022dev:JMuql7tyqgSlfl0K@lifesavercluster.6dpy5.mongodb.net/?retryWrites=true&w=majority&appName=LifeSaverCluster");
    await client.connect();
  }
  return client.db("LifeSaver");
};

export const getFiles = async (): Promise<Type.IFilesSchema[]> => {
  const db = await getDB();
  const files = await db.collection(Type.TableName.file).find<Type.IFilesSchema>({}).sort('createdAt', -1).toArray();
  return documentIdFormatter(files);
};

export const deleteFile = async (id: string): Promise<void> => {
  const db = await getDB();
  await db.collection(Type.TableName.file).deleteOne({ _id: new ObjectId(id) });
};

export const insertFile = async (file: string): Promise<string> => {
  const db = await getDB();
  const insertResult = await db.collection(Type.TableName.file).insertOne({ file, createdAt: new Date() });
  return String(insertResult.insertedId);
};

export const updateSaving = async (saving: Type.ISavingSchema): Promise<void> => {
  const db = await getDB();
  const id = new ObjectId(saving.id);
  formatInsert(saving);
  await db.collection(Type.TableName.saving).updateOne({ _id: id }, saving);
};

export const getSaving = async (): Promise<Type.ISavingSchema | null> => {
  const db = await getDB();
  const savings = await db.collection(Type.TableName.saving).findOne<Type.ISavingSchema>({});
  return documentIdFormatter(savings);
};

export const insertSavingList = async (list: Type.ISavingListSchema): Promise<void> => {
  const db = await getDB();
  formatInsert(list);
  await db.collection(Type.TableName.savingList).insertOne(list);
};

export const getSavingList = async (savingId: string): Promise<Type.ISavingListSchema[]> => {
  const db = await getDB();
  const list = await db.collection(Type.TableName.savingList)
    .find<Type.ISavingListSchema>({ savingId })
    .sort('createdAt', -1)
    .toArray();
  return documentIdFormatter(list);
};

export const deleteList = async (id: string): Promise<void> => {
  const db = await getDB();
  await db.collection(Type.TableName.savingList).deleteOne({ _id: new ObjectId(id) });
};

export const insertCategory = async (category: Type.ICategorySchema): Promise<void> => {
  const db = await getDB();
  const id = new ObjectId(category.id);
  formatInsert(category);
  await db.collection(Type.TableName.category).updateOne({ _id: id }, {
    $set: category
  });
};

export const getCategories = async (type: Type.CategoryType): Promise<Type.ICategorySchema[]> => {
  const db = await getDB();
  const categories = await db.collection(Type.TableName.category).find<Type.ICategorySchema>({ type }).sort('createdAt', -1).toArray();
  return documentIdFormatter(categories);
};

export const deleteCategory = async (id: string): Promise<void> => {
  const db = await getDB();
  await db.collection(Type.TableName.category).deleteOne({ _id: new ObjectId(id) });
};

export const insertAccount = async (account: Type.IAccountSchema): Promise<void> => {
  const db = await getDB();
  formatInsert(account);
  await db.collection(Type.TableName.account).insertOne(account);
};

export const getAccounts = async (type: Type.CategoryType, startDate: Date, endDate: Date): Promise<Type.IAccountSchema[]> => {
  const db = await getDB();
  const accounts = await db.collection(Type.TableName.account).find<Type.IAccountSchema>({
    type, createdAt: {
      $gte: startDate,
      $lte: endDate
    },
  }).sort('createdAt', -1).toArray();
  return documentIdFormatter(accounts);
};

export const getAccountByDate = async (type: Type.CategoryType, startDate: Date, endDate: Date): Promise<number> => {
  const db = await getDB();
  const [result] = await db.collection(Type.TableName.account).aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lte: endDate
        },
        type
      }
    },
    {
      $group:
        { _id: true, sum: { $sum: "$amount" } }
    },
  ]).toArray();
  return result?.sum ?? 0;
};

export const deleteAccount = async (id: string): Promise<void> => {
  const db = await getDB();
  await db.collection(Type.TableName.account).deleteOne({ _id: new ObjectId(id) });
};

export const insertHealthList = async (list: Type.IHealthSchema): Promise<void> => {
  const db = await getDB();
  formatInsert(list);
  await db.collection(Type.TableName.health).insertOne(list);
};

export const getHealthList = async (): Promise<Type.IHealthSchema[]> => {
  const db = await getDB();
  const list = await db.collection(Type.TableName.health)
    .find<Type.IHealthSchema>({})
    .sort('createdAt', -1)
    .toArray();
  return documentIdFormatter(list);
};

export const deleteHealth = async (id: string): Promise<void> => {
  const db = await getDB();
  await db.collection(Type.TableName.health).deleteOne({ _id: new ObjectId(id) });
};

const formatInsert = (list: { id?: string; }): void => {
  delete list.id;
};

const documentIdFormatter = <T>(list: T): T => {
  if (Array.isArray(list)) {
    return list.map((item) => {
      const id = String(item['_id']);
      delete item['_id'];
      return {
        ...item,
        id,
      };
    }) as T;
  } else {
    if (!list) return list;
    const _list = list as Record<string, unknown>;
    const id = String(_list['_id']);
    delete _list['_id'];
    return {
      ...list,
      id,
    };
  }
};