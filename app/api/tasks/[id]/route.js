import {tasks} from "@/lib/tasks"
import { NextResponse } from "next/server"

export async function GET(request , {params}){
  const { id } = await params;
  const task = tasks.find((items) => items.id === id)

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
  const body = await request.json();
  const data = tasks.find((items) => items.id === id)
  

  if(!data){
    return NextResponse.json(
      {message:"task not found"},
    {status:404}
    )
  }

  data.title = body.title
  data.completed = body.completed
   return NextResponse.json(
      {message:"task is updated successfully", task: data},
    {status:200}
    )
}
export async function DELETE(request, {params}){
  const { id } = await params;
  const index = tasks.findIndex((items) => items.id === id)

  if(index === -1){
    return NextResponse.json(
      {message:"task not found"},
    {status:404}
    )
  }

  tasks.splice(index, 1)
  return NextResponse.json(
      {message:"task is successfully deleted"},
    {status:200}
  )

}