import { db } from "@/db";
import { projects } from "@/db/schema";
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
  { params }: { params: Promise<{ projectId: string }> }
) {
  const userId = await getUserIdFromToken();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { projectId } = await params;
    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1);

    if (project.length === 0) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    // Verify ownership
    if (project[0].userId !== userId) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    return Response.json({ project: project[0] });
  } catch (error) {
    console.error("Get project error:", error);
    return Response.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const userId = await getUserIdFromToken();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, status, genre } = body;
    const { projectId } = await params;

    // Verify ownership
    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1);

    if (project.length === 0) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    if (project[0].userId !== userId) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const updated = await db
      .update(projects)
      .set({
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(status && { status }),
        ...(genre && { genre }),
        updatedAt: new Date(),
      })
      .where(eq(projects.id, projectId))
      .returning();

    return Response.json({ project: updated[0] });
  } catch (error) {
    console.error("Update project error:", error);
    return Response.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const userId = await getUserIdFromToken();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { projectId } = await params;
    // Verify ownership
    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1);

    if (project.length === 0) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    if (project[0].userId !== userId) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    await db.delete(projects).where(eq(projects.id, projectId));

    return Response.json({ success: true });
  } catch (error) {
    console.error("Delete project error:", error);
    return Response.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
