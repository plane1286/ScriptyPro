"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Podcast,
  BookOpen,
  Plus,
  MoreVertical,
  LogOut,
  FileText,
  Calendar,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  genre: string | null;
  updatedAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectData, setNewProjectData] = useState({
    title: "",
    type: "podcast",
    genre: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch projects
        const projRes = await fetch("/api/projects");
        if (!projRes.ok) {
          router.push("/login");
          return;
        }
        const projData = await projRes.json();
        setProjects(projData.projects || []);

        // Fetch user
        const userRes = await fetch("/api/user");
        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData.user);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProjectData),
      });

      if (res.ok) {
        const data = await res.json();
        setProjects([data.project, ...projects]);
        setShowNewProject(false);
        setNewProjectData({ title: "", type: "podcast", genre: "" });
      }
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <Podcast className="w-8 h-8 text-blue-400" />
            <span>Scriptly Pro</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-slate-300">{user?.name || "User"}</span>
            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-white transition flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Your Projects</h1>
            <p className="text-slate-400">
              {projects.length} {projects.length === 1 ? "project" : "projects"}
            </p>
          </div>
          <button
            onClick={() => setShowNewProject(!showNewProject)}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-medium transition flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Project
          </button>
        </div>

        {/* New Project Form */}
        {showNewProject && (
          <div className="bg-slate-800 rounded-lg p-6 mb-8 border border-slate-700">
            <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  value={newProjectData.title}
                  onChange={(e) =>
                    setNewProjectData({
                      ...newProjectData,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:border-blue-400 focus:outline-none text-white"
                  placeholder="e.g., The Mystery Hour"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    value={newProjectData.type}
                    onChange={(e) =>
                      setNewProjectData({
                        ...newProjectData,
                        type: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:border-blue-400 focus:outline-none text-white"
                  >
                    <option value="podcast">Podcast</option>
                    <option value="audiobook">Audiobook</option>
                    <option value="audio-drama">Audio Drama</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Genre</label>
                  <input
                    type="text"
                    value={newProjectData.genre}
                    onChange={(e) =>
                      setNewProjectData({
                        ...newProjectData,
                        genre: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:border-blue-400 focus:outline-none text-white"
                    placeholder="e.g., Mystery"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowNewProject(false)}
                  className="px-4 py-2 rounded-lg border border-slate-600 hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition font-medium"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
            <p className="text-slate-400 mb-6">
              Create your first project to get started writing
            </p>
            <button
              onClick={() => setShowNewProject(true)}
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-medium transition"
            >
              <Plus className="w-5 h-5" />
              Create First Project
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/editor/${project.id}`}
                className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-blue-400 transition group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {project.type === "podcast" ? (
                      <Podcast className="w-6 h-6 text-blue-400" />
                    ) : (
                      <BookOpen className="w-6 h-6 text-purple-400" />
                    )}
                    <div>
                      <h3 className="font-semibold group-hover:text-blue-400 transition">
                        {project.title}
                      </h3>
                      {project.genre && (
                        <p className="text-xs text-slate-400">{project.genre}</p>
                      )}
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-white">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                {project.description && (
                  <p className="text-sm text-slate-400 mb-4">
                    {project.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-700 pt-4">
                  <span className="capitalize">{project.status}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
