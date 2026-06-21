import mongoose from "mongoose";
import { DB_NAME } from "../utils/constant.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
        console.log(`Database Connected : ${connectionInstance.connection.host}`);
    } catch {
        console.error("Database Connection Failed", error);
        process.exit(1);
    }
}

export default connectDB;