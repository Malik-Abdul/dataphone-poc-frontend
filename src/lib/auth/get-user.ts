import { cookies } from "next/headers";

// import { prisma } from "@/lib/prisma";
// import { verifyToken } from "@/lib/utils/jwt";
import { User } from "@/types";
// import { Role } from "@prisma/client";
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:7003";

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    // console.log("accessToken in get user: ", accessToken);

    if (!accessToken) {
      return null;
    }

    const res = await fetch(`${API_URL}/users/me`, {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const result = await res.json();

    return result.data;
  } catch (error) {
    console.error("Get current user error:", error);

    return null;
  }
}
