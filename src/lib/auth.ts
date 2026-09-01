import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export interface AuthUser {
  userId: string;
  email: string;
}

export async function getAuthUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as AuthUser;
    return decoded;
  } catch {
    return null;
  }
}

export function createToken(user: AuthUser): string {
  return jwt.sign(user, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: "7d",
  });
}
