import Task from "@/models/Task"
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server"
import mongoose from "mongoose";

export async function GET(request , {params}){
 try {
   await connectDB();
  const { id } = await params;

  if (!mongoose.isValidObjectId(id)) {
  return NextResponse.json(
    { message: "Invalid task ID" },
    { status: 400 }
  );
}
  const task = await Task.findById(id)

  
  if(!task){
    return NextResponse.json(
      {message:"task not found"},
    {status:404}
    )
  }

  return NextResponse.json(
    {message:"task is retrieved", task},
    {status:200}
  )
  
}catch (err) {
  console.error("GET /api/tasks error:", err);

  return NextResponse.json(
    { message: "Internal server error" },
    { status: 500 }
  );
}

}

export async function PUT(request , {params}){
  const { id } = await params;

  try{
  if (!mongoose.isValidObjectId(id)) {
  return NextResponse.json(
    { message: "Invalid task ID" },
    { status: 400 }
  );
}

await connectDB();
  const body = await request.json();

  if (
  typeof body.title !== "string" ||
  body.title.trim() === "" ||
  typeof body.completed !== "boolean"
) {
  return NextResponse.json(
    { message: "Invalid inputs" },
    { status: 400 }
  );
} 

   const data = await Task.findById(id)
  

  if(!data){
    return NextResponse.json(
      {message:"task not found"},
    {status:404}
    )
  }

  data.title = body.title.trim()
  data.completed = body.completed

  await data.save();
   return NextResponse.json(
      {message:"task is updated successfully", task: data},
    {status:200}
    )
}catch (err) {
  console.error("PUT /api/tasks error:", err);

  return NextResponse.json(
    { message: "Internal server error" },
    { status: 500 }
  );
}}
export async function DELETE(request, {params}){
  try{await connectDB();
  const { id } = await params;

  if (!mongoose.isValidObjectId(id)) {
  return NextResponse.json(
    { message: "Invalid task ID" },
    { status: 400 }
  );
}

  const task = await Task.findByIdAndDelete(id)

  if(!task ){
    return NextResponse.json(
      {message:"task not found"},
    {status:404}
    )
  }

  return NextResponse.json(
      {message:"task is successfully deleted"},
    {status:200}
  )

}catch (err) {
  console.error("DELETE /api/tasks error:", err);

  return NextResponse.json(
    { message: "Internal server error" },
    { status: 500 }
  );
}}