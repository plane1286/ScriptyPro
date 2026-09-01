import { db } from "@/db";
import { projects, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

async function getUserIdFromToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as { userId: string };
    return decoded.userId;
  } catch {
    return null;
  }
}

export async function GET() {
  const userId = await getUserIdFromToken();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.userId, userId));

    return Response.json({ projects: userProjects });
  } catch (error) {
    console.error("Get projects error:", error);
    return Response.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const userId = await getUserIdFromToken();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, type, genre, description } = body;

    if (!title || !type) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newProject = await db
      .insert(projects)
      .values({
        userId,
        title,
        type,
        genre,
        description: description || "",
        status: "draft",
      })
      .returning();

    return Response.json({ project: newProject[0] });
  } catch (error) {
    console.error("Create project error:", error);
    return Response.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
