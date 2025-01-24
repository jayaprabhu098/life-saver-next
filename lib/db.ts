import { MongoClient } from 'mongodb';

let client: MongoClient | null = null;

export const getDB = async () => {
    if(!client) {
        client = new MongoClient(process.env.DB_URL!);
        await client.connect();
    }
    return client.db(process.env.DB_NAME)
}