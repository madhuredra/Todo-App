import express, { urlencoded }  from "express";
import dotenv from "dotenv"
import {connectDB} from './database/db.js';
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import { errorMiddleware } from "./middlewares/error.js";
import cors from 'cors';

import cookieParser from 'cookie-parser';



const app = express();
// dotevn configuration
dotenv.config();

// PORT
const PORT = process.env.PORT || 8080;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin :[ process.env.FRONTEND_URL], 
    methods : ["Get", "Post", "Put", "Delete"],
    credentials:true
}));
app.use(cookieParser())

// database connection
connectDB();

// routes
app.use('/api/v1/users',userRouter)
app.use('/api/v1/tasks',taskRouter)

// error handling
app.use(errorMiddleware)


// server configuration
app.listen(PORT , (req,res) => {
    console.log(`Server is listening at ${PORT} in ${process.env.NODE_ENV} mode`);
});