import { MongoClient } from 'mongodb';

let client: MongoClient | null = null;

export const getDB = async () => {
    if(!client) {
        client = new MongoClient("mongodb+srv://devawsteam:2CuX95xVx6qqK8b5@vibe-dev.2yhbx.mongodb.net/?retryWrites=true&w=majority&appName=vibe-dev");
        await client.connect();
    }
    return client.db("vibe-dev")
}