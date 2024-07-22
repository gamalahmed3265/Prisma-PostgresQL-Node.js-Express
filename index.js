import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";


const app=express()
const prisma =new PrismaClient();
dotenv.config()

const PORT=process.env.PORT || 6000

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Good")
})

app.listen(PORT,()=>{
    console.log(`App Listening in port ${PORT}`);
})