import mongoose from "mongoose";
import {ENV} from "./env.js";
import dns from "node:dns/promises";

// Configure public DNS to resolve MongoDB Atlas SRV records reliably
dns.setServers(["8.8.8.8", "1.1.1.1"]);

export const connectDB = async() => {
    try {
        if(!ENV.DB_URL) {
            throw new Error("DB_URL is not defined in environment variables");
        }

        const conn = await mongoose.connect(ENV.DB_URL)
        console.log("connected to MongoDB:", conn.connection.host);
        
    }
    catch(error) {
        console.error("error in connecting MongoDB" , error); 
        process.exit(1);
        
    }
}
