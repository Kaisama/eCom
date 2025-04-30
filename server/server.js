import cookieParser from "cookie-parser";
import express from "express"
import mongoose from "mongoose";
import cors from "cors";
import authRouter from './routes/Auth/AuthRoutes.js';

mongoose.connect('mongodb+srv://akshat:akshat@cluster0.tmcjjru.mongodb.net/')
.then(()=>console.log('Database Connected '))
.catch((error)=>console.log(error.message));



// const PORT=process.env.PORT || 5000;
const PORT= 5000;

const app= express();


app.use(
    cors({
        origin:'http://localhost:5173',
        methods:['GET','POST','DELETE','PUT'],
        allowedHeaders:[
            'Content-Type',
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials:true
    })
);

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth',authRouter);

app.listen(PORT,()=>console.log('Server is running'))