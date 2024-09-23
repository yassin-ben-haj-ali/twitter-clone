import express from "express"
import dotenv from "dotenv"
import http from "http"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary"

import rootRouter from "./routes/index.js";
import logger from "./utils/logger.js";
import path from "path";

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();

app.use(express.json()) //to parse req.body
app.use(express.urlencoded({ extended: true })) //to parse form data(urlencoded)
app.use(cookieParser())
app.use("/api", rootRouter)
app.use((err, req, res, next) => {
    logger.error(err);
    if (err.isOperational) {
        res.status(err.code).json({ message: err.message });
    } else {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


const server = http.createServer(app);
const PORT = process.env.PORT || 5000
const __dirname=path.resolve();

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    })
}

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        logger.info('✅ Connected to DB');
        server.listen(PORT, () => {
            logger.info(`🚀 Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        logger.error(err.message);
    });