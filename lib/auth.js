
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) {
      return null;
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );

    if (!payload.sub) {
      return null;
    }

    return {
      userId: payload.sub,
    };
  } catch (error) {
    if (error.message === "JWT_SECRET is not configured") {
      throw error;
    }

    return null;
  }
}