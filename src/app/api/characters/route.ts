import { db } from "@/db";
import { characters, projects } from "@/db/schema";
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

export async function GET(request: Request) {
  const userId = await getUserIdFromToken();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return Response.json(
        { error: "Missing projectId" },
        { status: 400 }
      );
    }

    // Verify user owns project
    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1);

    if (project.length === 0 || project[0].userId !== userId) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const projectCharacters = await db
      .select()
      .from(characters)
      .where(eq(characters.projectId, projectId));

    return Response.json({ characters: projectCharacters });
  } catch (error) {
    console.error("Get characters error:", error);
    return Response.json(
      { error: "Failed to fetch characters" },
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
    const { projectId, name, role, description, voiceProfile } = body;

    if (!projectId || !name) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify user owns project
    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1);

    if (project.length === 0 || project[0].userId !== userId) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const newCharacter = await db
      .insert(characters)
      .values({
        projectId,
        name,
        role,
        description,
        voiceProfile,
      })
      .returning();

    return Response.json({ character: newCharacter[0] });
  } catch (error) {
    console.error("Create character error:", error);
    return Response.json(
      { error: "Failed to create character" },
      { status: 500 }
    );
  }
}
