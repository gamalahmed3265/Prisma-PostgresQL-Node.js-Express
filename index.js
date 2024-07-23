import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";


const app=express()
const prisma =new PrismaClient();
dotenv.config()

const PORT=process.env.PORT || 6000

app.use(express.json())

app.post("/",async(req,res)=>{
    
    console.log(req.body);
    const {
        firstName,
        lastName,
        age
    }=req.body;

    const newUser=await prisma.user.create({
        data:{
            firstName,
            lastName,
            age:+age
        }
    })
    res.json({
        message:"User is Created",
        user:newUser
    });
})

app.get("/",async(req,res)=>{
    try {
        const allUser=await prisma.user.findMany()
        
        res.json({
            message:"Users is returned",
            status:200,
            users:allUser
        });
        
    } catch (error) {
        res.json({
            message:error,
            status:400
        });
    }
})

app.patch("/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const {age}=req.body;
        
        const updateUser=await prisma.user.update({
            where:{
                id:parseInt(id)
            },
            data:{
                age
            }
        })
        
        res.json({
            message:"Users is Updated",
            status:200,
            user:updateUser
        });

    } catch (error) {
        res.json({
            message:error,
            status:400
        });

    }
})
app.delete("/:id",async(req,res)=>{
    try {
        const id=req.params.id;        
        await prisma.user.delete({
            where:{
                id:parseInt(id)
            },
        })
        res.json({
            message:"Users is Deleted",
            status:200,
        });

    } catch (error) {
        res.json({
            message:error,
            status:400
        });

    }
})

app.listen(PORT,()=>{
    console.log(`App Listening in port ${PORT}`);
})