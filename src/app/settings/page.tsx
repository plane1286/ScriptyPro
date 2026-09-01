"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Podcast,
  User,
  CreditCard,
  Shield,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/user")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        setName(data.user.name || "");
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleSaveProfile = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        setMessage("Profile updated successfully");
      }
    } catch {
      setMessage("Failed to update profile");
    } finally {
      setSaving(false);
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
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <header className="border-b border-slate-700">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-2xl font-bold flex items-center gap-2">
            <Podcast className="w-8 h-8 text-blue-400" />
            <span>Scriptly Pro</span>
          </Link>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-white transition flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Settings</h1>

        {/* Profile Section */}
        <section className="bg-slate-800 rounded-xl p-6 mb-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold">Profile</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:border-blue-400 focus:outline-none text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-slate-400 cursor-not-allowed"
              />
              <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
            </div>

            {message && (
              <p className="text-sm text-green-400">{message}</p>
            )}

            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 px-6 py-2 rounded-lg font-medium transition"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </section>

        {/* Billing Section */}
        <section className="bg-slate-800 rounded-xl p-6 mb-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-blue-400" />
              <div>
                <h2 className="text-xl font-semibold">Billing</h2>
                <p className="text-sm text-slate-400">Current plan: Free</p>
              </div>
            </div>
            <Link
              href="/pricing"
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition"
            >
              Upgrade
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Security Section */}
        <section className="bg-slate-800 rounded-xl p-6 mb-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold">Security</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Password</p>
                <p className="text-sm text-slate-400">Last changed: Never</p>
              </div>
              <button className="text-blue-400 hover:text-blue-300 transition text-sm font-medium">
                Change Password
              </button>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-slate-800 rounded-xl p-6 border border-red-900/50">
          <h2 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-slate-400">
                Permanently delete your account and all data
              </p>
            </div>
            <button className="border border-red-500 text-red-400 hover:bg-red-500/10 px-4 py-2 rounded-lg transition text-sm font-medium">
              Delete Account
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
