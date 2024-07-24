import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";


const app=express()
const prisma =new PrismaClient();
dotenv.config()

const PORT=process.env.PORT || 6000

app.use(express.json())

app.post("/",async(req,res)=>{
    
    const {
        firstName,
        lastName,
        email,
        age
    }=req.body;

    const newUser=await prisma.user.create({
        data:{
            firstName,
            lastName,
            email,
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




app.post("/post",async(req,res)=>{
    
    const {
        title,
        authorId,
    }=req.body;

    const newPost=await prisma.post.create({
        data:{
            title,
            authorId,
            active:true,
            data:null
        },include:{
            author:true
        }
    })
    res.json({
        message:"Post is Created",
        post:newPost
    });
})
app.post("/post/many",async(req,res)=>{

    try {
        const newPosts=await prisma.post.createMany({
            data:req.body
        })
        res.json({
            message:"Posts is Created",
            post:newPosts
        });
    } catch (error) {
        res.json({
            message:error,
            status:400
        });
    }
})

app.get("/post",async(req,res)=>{
    try {
        const allPost=await prisma.post.findMany({
            where:{
                title,
                active,
                data,
                authorId
            },
            include:{
                author:true
            }
        })
        
        res.json({
            message:"Post is returned",
            status:200,
            posts:allPost
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