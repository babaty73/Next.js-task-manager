
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { authorizeRoles } from "@/lib/authorization";

export async function GET() {
  try {
    const { user, error } = await authorizeRoles(["admin"]);

    if (error) {
      return error;
    }

    await connectDB();

    const users = await User.find()
      .select("_id name email role createdAt")
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return NextResponse.json(
      {
        message: "Users retrieved successfully",
        users,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/admin/users error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}