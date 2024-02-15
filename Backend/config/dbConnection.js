import mongoose from "mongoose";


import { db_url } from "../config/config.js";


const connectionDB = async () => {

    try {
        
        await mongoose.connect(db_url);

        console.log("connection database..");
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

export default connectionDB;