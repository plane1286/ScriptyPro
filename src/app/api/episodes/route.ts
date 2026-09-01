import { db } from "@/db";
import { episodes, projects } from "@/db/schema";
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

    const projectEpisodes = await db
      .select()
      .from(episodes)
      .where(eq(episodes.projectId, projectId));

    return Response.json({ episodes: projectEpisodes });
  } catch (error) {
    console.error("Get episodes error:", error);
    return Response.json(
      { error: "Failed to fetch episodes" },
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
    const { projectId, title, content, episodeNumber } = body;

    if (!projectId || !title) {
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

    const newEpisode = await db
      .insert(episodes)
      .values({
        projectId,
        title,
        content: content || "",
        episodeNumber,
        status: "draft",
      })
      .returning();

    return Response.json({ episode: newEpisode[0] });
  } catch (error) {
    console.error("Create episode error:", error);
    return Response.json(
      { error: "Failed to create episode" },
      { status: 500 }
    );
  }
}
