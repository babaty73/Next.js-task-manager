import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";

export async function GET(){
  await connectDB();
  const tasks = await Task.find();

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

  const task = await Task.create({
    title,
    completed:false,
  });

return NextResponse.json(
  { message: "Task added", task},
  { status: 201 }
);
}