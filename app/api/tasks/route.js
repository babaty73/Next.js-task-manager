import {tasks} from "@/lib/tasks"
import { NextResponse } from "next/server"

export async function GET(){
  return NextResponse.json(
  { message: "Tasks retrieved", tasks },
  { status: 200 }
);
}
export async function POST(request){
  const data = await request.json();
  const title = typeof data.title === "string" ? data.title.trim() : "";

if (!title) {
  return NextResponse.json(
    { message: "Empty title is not allowed" },
    { status: 400 }
  );
}

  const task = {
    id:String(Date.now()),
    title,
    completed:false,
  }

  tasks.push(task)
return NextResponse.json(
  { message: "Task added", task },
  { status: 201 }
);
}