import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";
import { Notes } from "@/models/Notes";

export async function POST(req){
    mongoose.connect(process.env.MONGO_URL)
    const {description,title} = await req.json();
    if(await isAdmin){
        return Response.json( await Notes.create({description,title}))
    }else{
        return Response.json({})
    }
}
export async function PUT(req){
    const {_id,title,description}= await req.json()
    if(await isAdmin){
        await Notes.updateOne({_id}, {title,description})
    }
    return Response.json(true)
}
export async function GET(){
    return Response.json(
        await Notes.find()
    )
}
export async function DELETE(req){
    mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id')
    if(await isAdmin){
        await Notes.deleteOne({_id})
    }
    return Response.json(true)
}