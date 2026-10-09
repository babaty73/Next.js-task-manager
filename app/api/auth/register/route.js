import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {

let body;

try {
  body = await request.json();
} catch {
  return NextResponse.json(
    { message: "Invalid JSON body" },
    { status: 400 }
  );
}

  try {


    const name =
      typeof body.name === "string" ? body.name.trim() : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const password = body.password;

    if (
      !name ||
      !email ||
      typeof password !== "string" ||
      password.length < 8
    ) {
      return NextResponse.json(
        {
          message:
            "Name and email are required. Password must be at least 8 characters.",
        },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    if (
  name.length < 2 ||
  name.length > 100 ||
  email.length > 254 ||
  Buffer.byteLength(password, "utf8") > 72
) {
  return NextResponse.json(
    { message: "Invalid registration data" },
    { status: 400 }
  );}

    await connectDB();

    const existingUser = await User.findOne({ email });

if (existingUser) {
  return NextResponse.json(
    { message: "Email is already registered" },
    { status: 409 }
  );
}
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      passwordHash,
    });

    return NextResponse.json(
      {
        message: "Registration successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === 11000) {
  return NextResponse.json(
    { message: "Email is already registered" },
    { status: 409 }
  );
}
    console.error("POST /api/auth/register error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );

  }
}