
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function authorizeRoles(allowedRoles) {
  const session = await getSession();

  if (!session) {
    return {
      user: null,
      error: NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      ),
    };
  }

  await connectDB();

  const user = await User.findById(session.userId).select(
    "_id name email role"
  );

  if (!user) {
    return {
      user: null,
      error: NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      ),
    };
  }

  if (!allowedRoles.includes(user.role)) {
    return {
      user: null,
      error: NextResponse.json(
        { message: "You do not have permission to perform this action" },
        { status: 403 }
      ),
    };
  }

  return {
    user,
    error: null,
  };
}