import mongoose, { Connection } from "mongoose";
import { config } from "dotenv";
config();

const { DB_URL } = process.env;

export default async function connectDB(): Promise<Connection> {
    mongoose.set('strictQuery', true);

    const db = await mongoose.connect(DB_URL!)

    return db.connection;
}
