import express from "express";
import { ENV } from "./lib/env.js";
import {connectDB} from "./lib/db.js";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, World! 456" });
});

// console.log(ENV);
// console.log(process.env.DB_URL);
// console.log(connectDB);


app.listen(ENV.PORT, () => {
    console.log("server is running");
    connectDB();
});    


