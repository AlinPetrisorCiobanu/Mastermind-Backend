import mongoose from "mongoose";
import CONFIDENCE from "../Config/Config_Conexion.js"



const conectionDB = async () => {
    const dbName = 'MasterMind';
    const url = CONFIDENCE.URLDB;

    try {
        const conn = await mongoose.connect(url, {dbName});
        console.log(`MongoDB connected`);
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1);
    }
}

export default conectionDB;