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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ episodeId: string }> }
) {
  const userId = await getUserIdFromToken();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { episodeId } = await params;
    const episode = await db
      .select()
      .from(episodes)
      .where(eq(episodes.id, episodeId))
      .limit(1);

    if (episode.length === 0) {
      return Response.json({ error: "Episode not found" }, { status: 404 });
    }

    // Verify user owns project
    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.id, episode[0].projectId))
      .limit(1);

    if (project.length === 0 || project[0].userId !== userId) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    return Response.json({ episode: episode[0] });
  } catch (error) {
    console.error("Get episode error:", error);
    return Response.json(
      { error: "Failed to fetch episode" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ episodeId: string }> }
) {
  const userId = await getUserIdFromToken();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, content, status, duration } = body;
    const { episodeId } = await params;

    // Get episode and verify ownership
    const episode = await db
      .select()
      .from(episodes)
      .where(eq(episodes.id, episodeId))
      .limit(1);

    if (episode.length === 0) {
      return Response.json({ error: "Episode not found" }, { status: 404 });
    }

    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.id, episode[0].projectId))
      .limit(1);

    if (project.length === 0 || project[0].userId !== userId) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const updated = await db
      .update(episodes)
      .set({
        ...(title && { title }),
        ...(content !== undefined && { content }),
        ...(status && { status }),
        ...(duration && { duration }),
        updatedAt: new Date(),
      })
      .where(eq(episodes.id, episodeId))
      .returning();

    return Response.json({ episode: updated[0] });
  } catch (error) {
    console.error("Update episode error:", error);
    return Response.json(
      { error: "Failed to update episode" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ episodeId: string }> }
) {
  const userId = await getUserIdFromToken();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { episodeId } = await params;
    // Get episode and verify ownership
    const episode = await db
      .select()
      .from(episodes)
      .where(eq(episodes.id, episodeId))
      .limit(1);

    if (episode.length === 0) {
      return Response.json({ error: "Episode not found" }, { status: 404 });
    }

    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.id, episode[0].projectId))
      .limit(1);

    if (project.length === 0 || project[0].userId !== userId) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    await db.delete(episodes).where(eq(episodes.id, episodeId));

    return Response.json({ success: true });
  } catch (error) {
    console.error("Delete episode error:", error);
    return Response.json(
      { error: "Failed to delete episode" },
      { status: 500 }
    );
  }
}
