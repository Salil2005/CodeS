import express from "express";
import { ENV } from "./lib/env.js";
import {connectDB} from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import { clerkMiddleware } from '@clerk/express';
import { protectRoute } from "./middleware/protectRoute.js";

import chatRoutes from "./routes/chatRoutes.js"
import sessionRoutes from "./routes/sessionRoute.js"

const app = express();

//middleware 
app.use(clerkMiddleware()); // add Clerk middleware to handle authentication and user management
app.use(express.json()) ;
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true })); // TRUE : allow cookies to be sent with requests from the client


app.use("/api/inngest" , serve({client: inngest , functions}));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

app.get("/video-call", protectRoute , (req, res) => {
  res.status(200).json({ message: "this video call endpoint" });
});

// console.log(ENV);
// console.log(process.env.DB_URL);
// console.log(connectDB);


app.listen(ENV.PORT, () => {
    console.log("server is running");
    connectDB();
});    


