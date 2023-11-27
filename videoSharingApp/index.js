import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"

import userRouter from "./routes/userRoutes.js";
import videoRouter from "./routes/videoRoutes.js";
import commentsRouter from "./routes/commentsRoutes.js";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";



const app = express();
dotenv.config()
const port = 8000;
app.use(cors())

const connect = () => {
    mongoose.connect(process.env.MONGO)
    .then(()=>{
        console.log("DB connected");
    }).catch((err)=>{
        throw err 
    })
}

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/videos", videoRouter );
app.use("/api/comments", commentsRouter);

app.use((err, req,  res, next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message, 

    })
})



app.listen(port, ()=>{
    console.log(`server in running in port number ${port}`)
    connect()
})