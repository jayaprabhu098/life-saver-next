'use server';
import * as cache from "./cache";
import { getMonthWeekDayDate } from "./date";
import * as db from "./db";
import * as Type from "./type";

export const getAccountSum = async (
    type: Type.CategoryType, startDate: Date, endDate: Date
) => {
    let sum = 0;
    if (checkIsSameMonth(startDate, endDate)) {
        sum = await db.getAccountByDate(type, startDate, endDate);
    } else {
        const accounts = await cache.get<Type.IAccountSchema>(Type.TableName.account);
        for (const account of accounts) {
            if (account.type == type && account
                && startDate.getTime() >= account.createdAt.getTime()
                && endDate.getTime() <= account.createdAt.getTime()
            ) {
                sum += account.amount;
            }
        }
    }
    return sum;
};

export const getFiles = async (

) => {
    let files = await cache.get<Type.IFilesSchema>(Type.TableName.file);
    if (!files.length) {
        files = await setFileCache();
    }
    return files;
};

const setFileCache = async () => {
    const files = await db.getFiles();
    await cache.set<Type.IFilesSchema>(Type.TableName.file, files);
    return files;
};

export const deleteFile = async (
    id: string
) => {
    await db.deleteFile(id);
    setFileCache();
};

export const insertFile = async (
    file: string
) => {
    const res = await db.insertFile(file);
    setFileCache();
    return res;
};

export const getCategories = async (
    type: Type.CategoryType
) => {
    let categories = await cache.get<Type.ICategorySchema>(Type.TableName.category);
    if (!categories.length) {
        categories = await setCategoriesCache();
    }
    categories = categories.filter((category) => category.type == type);
    return categories;
};

const setCategoriesCache = async () => {
    const categories = await db.getCategories();
    await cache.set<Type.ICategorySchema>(Type.TableName.category, categories);
    return categories;
};

export const deleteCategory = async (
    id: string
) => {
    await db.deleteCategory(id);
    setCategoriesCache();
};

export const insertCategory = async (
    category: Type.ICategorySchema
) => {
    const res = await db.insertCategory(category);
    setCategoriesCache();
    return res;
};

export const getHealthList = async (
) => {
    let healthList = await cache.get<Type.IHealthSchema>(Type.TableName.health);
    if (!healthList.length) {
        healthList = await setHealthCache();
    }
    return healthList;
};

const setHealthCache = async () => {
    const healthList = await db.getHealthList();
    await cache.set<Type.IHealthSchema>(Type.TableName.health, healthList);
    return healthList;
};

export const deleteHealth = async (
    id: string
) => {
    await db.deleteHealth(id);
    setHealthCache();
};

export const insertHealth = async (
    health: Type.IHealthSchema
) => {
    const res = await db.insertHealthList(health);
    setHealthCache();
    return res;
};

const checkIsSameMonth = (
    startDate: Date, endDate: Date
) => {
    const dates = getMonthWeekDayDate();
    return startDate.getTime() == dates.startMonthDate.getTime()
        && endDate.getTime() == dates.endMonthDate.getTime();
};

