import express from "express"
import dotenv from "dotenv"
import http from "http"
import mongoose from "mongoose";

import rootRouter from "./routes/index.js";

dotenv.config();

const app = express();

app.use("/api", rootRouter)



const server = http.createServer(app);
const PORT = process.env.PORT || 5000


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Connected to DB');
        server.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err.message);
    });