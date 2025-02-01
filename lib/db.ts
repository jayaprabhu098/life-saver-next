import { MongoClient } from 'mongodb';

let client: MongoClient | null = null;

export const getDB = async () => {
    if(!client) {
        client = new MongoClient("mongodb+srv://test2022dev:JMuql7tyqgSlfl0K@lifesavercluster.6dpy5.mongodb.net/?retryWrites=true&w=majority&appName=LifeSaverCluster");
        await client.connect();
    }
    return client.db("LifeSaver")
}