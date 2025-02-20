'use server';
import path from 'path';
import fs from 'fs/promises';

export const set = async <T>(key: string, data: T[]) => {
    await fs.writeFile(
        getFileName(key),
        JSON.stringify(data)
    );
};

export const get = async <T>(key: string) => {
    try {
        const data = await fs.readFile(
            getFileName(key),
            'utf-8'
        );
        return JSON.parse(data) as T[];
    } catch (error) {
        console.log(error)
        return []
    }
};

const getFileName = (key: string) => {
    return path.join(`/${key}.json`);
};