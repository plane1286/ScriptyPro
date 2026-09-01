"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  Podcast,
  ChevronDown,
  Plus,
  Save,
  BookOpen,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

interface Episode {
  id: string;
  title: string;
  episodeNumber: number | null;
  status: string;
  content: string;
}

interface Project {
  id: string;
  title: string;
  type: string;
  genre: string | null;
  description: string;
}

export default function EditorPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId as string;

  const [project, setProject] = useState<Project | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNewEpisode, setShowNewEpisode] = useState(false);
  const [newEpisodeTitle, setNewEpisodeTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch project
        const projRes = await fetch(`/api/projects/${projectId}`);
        if (!projRes.ok) {
          router.push("/dashboard");
          return;
        }
        const projData = await projRes.json();
        setProject(projData.project);

        // Fetch episodes
        const episodesRes = await fetch(`/api/episodes?projectId=${projectId}`);
        if (episodesRes.ok) {
          const episodesData = await episodesRes.json();
          setEpisodes(episodesData.episodes || []);

          // Set first episode as current
          if (episodesData.episodes && episodesData.episodes.length > 0) {
            setCurrentEpisode(episodesData.episodes[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchData();
    }
  }, [projectId, router]);

  const handleSaveEpisode = async () => {
    if (!currentEpisode) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/episodes/${currentEpisode.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: currentEpisode.content,
        }),
      });

      if (res.ok) {
        // Update local state
      }
    } catch (error) {
      console.error("Failed to save episode:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateEpisode = async () => {
    try {
      const res = await fetch("/api/episodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          title: newEpisodeTitle || `Episode ${episodes.length + 1}`,
          content: "",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setEpisodes([...episodes, data.episode]);
        setCurrentEpisode(data.episode);
        setShowNewEpisode(false);
        setNewEpisodeTitle("");
      }
    } catch (error) {
      console.error("Failed to create episode:", error);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/dashboard" className="text-2xl font-bold flex items-center gap-2">
            <Podcast className="w-8 h-8 text-blue-400" />
            <span>Scriptly Pro</span>
          </Link>

          {project && (
            <div className="flex-1 mx-8">
              <h1 className="text-2xl font-bold">{project.title}</h1>
              <p className="text-sm text-slate-400 capitalize">{project.type}</p>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-white transition"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-72" : "w-0"
          } border-r border-slate-700 bg-slate-800 overflow-y-auto transition-all duration-300`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Episodes</h2>
              <button
                onClick={() => setShowNewEpisode(!showNewEpisode)}
                className="text-blue-400 hover:text-blue-300 transition"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {showNewEpisode && (
              <div className="mb-4 p-3 bg-slate-700 rounded-lg space-y-2">
                <input
                  type="text"
                  value={newEpisodeTitle}
                  onChange={(e) => setNewEpisodeTitle(e.target.value)}
                  className="w-full px-3 py-1 rounded bg-slate-600 border border-slate-500 focus:border-blue-400 focus:outline-none text-white text-sm"
                  placeholder="Episode title"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleCreateEpisode}
                    className="flex-1 px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 text-sm transition"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setShowNewEpisode(false)}
                    className="flex-1 px-2 py-1 rounded bg-slate-600 hover:bg-slate-500 text-sm transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {episodes.map((episode) => (
                <button
                  key={episode.id}
                  onClick={() => setCurrentEpisode(episode)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    currentEpisode?.id === episode.id
                      ? "bg-blue-500 text-white"
                      : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                  }`}
                >
                  <div className="font-medium text-sm">{episode.title}</div>
                  <div className="text-xs opacity-75 capitalize">
                    {episode.status}
                  </div>
                </button>
              ))}
            </div>

            {episodes.length === 0 && !showNewEpisode && (
              <div className="text-center py-8 text-slate-400">
                <p className="text-sm mb-4">No episodes yet</p>
                <button
                  onClick={() => setShowNewEpisode(true)}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Create first episode
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Editor */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="border-b border-slate-700 bg-slate-900 px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-400 hover:text-white transition"
            >
              <ChevronDown className="w-5 h-5" />
            </button>

            <div className="flex-1 text-center">
              {currentEpisode && (
                <h2 className="text-xl font-semibold">{currentEpisode.title}</h2>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button className="text-slate-400 hover:text-white transition">
                <Users className="w-5 h-5" />
              </button>
              <button
                onClick={handleSaveEpisode}
                disabled={saving}
                className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 px-4 py-2 rounded-lg font-medium transition flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>

          {/* Script Editor */}
          <div className="flex-1 overflow-hidden flex flex-col p-6">
            {currentEpisode ? (
              <div className="flex-1 flex flex-col">
                <div className="flex-1 bg-slate-800 rounded-lg overflow-hidden border border-slate-700 flex flex-col">
                  <textarea
                    value={currentEpisode.content}
                    onChange={(e) =>
                      setCurrentEpisode({
                        ...currentEpisode,
                        content: e.target.value,
                      })
                    }
                    className="flex-1 p-6 bg-slate-800 text-white font-mono text-sm focus:outline-none resize-none"
                    placeholder="Start writing your script here... Use Scene Heading format and dialogue. Optionally press Cmd+Space for AI suggestions."
                  />
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Episode Selected</h3>
                  <p className="text-slate-400 mb-6">
                    Create or select an episode to start writing
                  </p>
                  <button
                    onClick={() => setShowNewEpisode(true)}
                    className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-medium transition"
                  >
                    <Plus className="w-5 h-5" />
                    Create Episode
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
