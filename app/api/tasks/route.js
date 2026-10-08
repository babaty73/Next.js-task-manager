import {tasks} from "@/lib/tasks"
import { NextResponse } from "next/server"

export async function GET(){
  return NextResponse.json(tasks,
    {message:"tasks are loaded"},
    {status:200}
  )
}
export async function POST(request){
  const data = await request.json()
  const body = data.title.trim("")
  if(!body){
    return NextResponse.json(
      {message:"empty title is not allowed"},
    {status:400}
    )
  }
  
  body.title.trim()

  const task = {
    id:Date.now,
    title,
    completed:false,
  }

  tasks.push(task)

  return NextResponse.json(
    {message:"task is added"},
    {status:201}
  )
}