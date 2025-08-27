"use client";

import { useEffect, useState } from "react";

type PackageItem = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
};

export default function AdminPage() {
  const [items, setItems] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      const res = await fetch("/api/packages", { cache: "no-store" });
      const data = await res.json();
      setItems(data);
    } catch (e) {
      console.error(e);
      setError("Failed to load packages");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, imageUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create package");
        return;
      }


      setTitle("");
      setDescription("");
      setImageUrl("");

      load();
    } catch (e) {
      console.error(e);
      setError("Something went wrong");
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
      <h1 style={{ marginBottom: 12 }}>Admin — Manage Packages</h1>

      <form onSubmit={handleCreate} style={{ display: "grid", gap: 12, marginBottom: 24 }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
        />
        <input
          placeholder="Image URL (temporarily text)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
        />

        {error && <div style={{ color: "crimson" }}>{error}</div>}

        <button
          type="submit"
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: 0,
            background: "black",
            color: "white",
            cursor: "pointer",
          }}
        >
          Create Package
        </button>
      </form>

      <h2 style={{ margin: "24px 0 12px" }}>Existing Packages</h2>
      {loading ? (
        <p>Loading…</p>
      ) : items.length === 0 ? (
        <p>No packages yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {items.map((p) => (
            <div key={p.id} style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
              <img
                src={p.imageUrl}
                alt={p.title}
                style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8, marginBottom: 8 }}
              />
              <h3 style={{ margin: "8px 0" }}>{p.title}</h3>
              <p style={{ fontSize: 14, color: "#444" }}>{p.description}</p>
              <small style={{ color: "#888" }}>
                {new Date(p.createdAt).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
