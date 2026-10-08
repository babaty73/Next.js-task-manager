import Task from "@/models/Task"
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server"

export async function GET(request , {params}){
  await connectDB();
  const { id } = await params;
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
  
}

export async function PUT(request , {params}){
  const { id } = await params;
  await connectDB();
  const body = await request.json();
   const data = await Task.findById(id)
  

  if(!data){
    return NextResponse.json(
      {message:"task not found"},
    {status:404}
    )
  }

  data.title = body.title
  data.completed = body.completed
  await data.save();
   return NextResponse.json(
      {message:"task is updated successfully", task: data},
    {status:200}
    )
}
export async function DELETE(request, {params}){
  const { id } = await params;
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

}