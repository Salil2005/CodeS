import express from "express";
import { ENV } from "./lib/env.js";
import {connectDB} from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";

const app = express();

//middleware 
app.use(express.json()) ;
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true })); // TRUE : allow cookies to be sent with requests from the client

app.use("/api/inngest", serve({ client: inngest , functions}))

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


