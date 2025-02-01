import { ObjectId } from "mongodb";
import * as Type from "./type.js";
import { getDB } from "@/lib/db.js";

export class API {

  public getFiles = async (): Promise<Type.IFilesSchema[]> => {
    const db = await getDB();
    const files = await db.collection(Type.TableName.file).find<Type.IFilesSchema>({}).sort('createdAt', -1).toArray();
    return this.documentIdFormatter(files);
  };

  public deleteFile = async (id: string): Promise<void> => {
    const db = await getDB();
    await db.collection(Type.TableName.file).deleteOne({ _id: new ObjectId(id) });
  };

  public insertFile = async (file: string): Promise<void> => {
    const db = await getDB();
    await db.collection(Type.TableName.file).insertOne({ file, createdAt: new Date() });
  };

  public insertSaving = async (saving: Type.ISavingSchema): Promise<void> => {
    const db = await getDB();
    this.formatInsert(saving);
    await db.collection(Type.TableName.saving).insertOne(saving);
  };

  public getSavings = async (): Promise<Type.ISavingSchema[]> => {
    const db = await getDB();
    const savings = await db.collection(Type.TableName.saving).find<Type.ISavingSchema>({}).sort('createdAt', -1).toArray();
    return this.documentIdFormatter(savings);
  };

  public deleteSaving = async (id: string): Promise<void> => {
    const db = await getDB();
    await db.collection(Type.TableName.saving).deleteOne({ _id: new ObjectId(id) });
  };

  public insertCategory = async (category: Type.ICategorySchema): Promise<void> => {
    const db = await getDB();
    this.formatInsert(category);
    await db.collection(Type.TableName.category).insertOne(category);
  };

  public getCategories = async (type: Type.CategoryType): Promise<Type.ICategorySchema[]> => {
    const db = await getDB();
    const categories = await db.collection(Type.TableName.category).find<Type.ICategorySchema>({ type }).sort('createdAt', -1).toArray();
    return this.documentIdFormatter(categories);
  };

  public deleteCategory = async (id: string): Promise<void> => {
    const db = await getDB();
    await db.collection(Type.TableName.category).deleteOne({ _id: new ObjectId(id) });
  };

  public insertAccount = async (account: Type.IAccountSchema): Promise<void> => {
    const db = await getDB();
    this.formatInsert(account);
    await db.collection(Type.TableName.account).insertOne(account);
  };

  public getAccounts = async (type: Type.CategoryType): Promise<Type.IAccountSchema[]> => {
    const db = await getDB();
    const accounts = await db.collection(Type.TableName.account).find<Type.IAccountSchema>({ type }).sort('createdAt', -1).toArray();
    return this.documentIdFormatter(accounts);
  };

  public deleteAccount = async (id: string): Promise<void> => {
    const db = await getDB();
    await db.collection(Type.TableName.account).deleteOne({ _id: new ObjectId(id) });
  };

  private formatInsert = (list: { id?: string; }): void => {
    delete list.id;
  };

  private documentIdFormatter = <T>(list: T): T => {
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

}