import express from "express"
import dotenv from "dotenv"
import http from "http"
import mongoose from "mongoose";

import rootRouter from "./routes/index.js";
import logger from "./utils/logger.js";

dotenv.config();

const app = express();

app.use(express.json())
app.use("/api", rootRouter)
app.use((err, req, res, next) => {
    logger.error(err);
     if (err.isOperational) {
        console.log("isoperationel",err.isOperational)
        res.status(err.code).json({ message: err.message });
    } else {
        console.log("isNotOperationel",err.isOperational)
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


const server = http.createServer(app);
const PORT = process.env.PORT || 5000


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