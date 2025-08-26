"use client";

import { useState } from "react";

export default function AddTripPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const res = await fetch("/api/trips", {
        method: "POST",
        body: formData, // client-side sirf formData bhej raha hai
      });

      if (!res.ok) throw new Error("Failed to create trip");

      const data = await res.json();
      console.log("✅ Trip created:", data);

      setMessage("✅ Trip created successfully!");
      form.reset(); // form submit ke baad khali ho jayega
    } catch (error: any) {
      console.error("❌ Error:", error);
      setMessage(`❌ ${error.message || "Failed to create trip"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="w-full max-w-lg backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8">
        <h1 className="text-4xl font-extrabold text-white text-center mb-8 drop-shadow-lg">
          ✈️ Add a New Trip
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          {/* Title */}
          <div>
            <label className="block text-white font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter trip title"
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-medium mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Enter description"
              rows={3}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          {/* Destination */}
          <div>
            <label className="block text-white font-medium mb-2">Destination</label>
            <input
              type="text"
              name="destination"
              placeholder="Destination (e.g. Dubai)"
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-white font-medium mb-2">Price</label>
            <input
              type="number"
              name="price"
              placeholder="1000"
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-white font-medium mb-2">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full p-3 rounded-xl bg-white/20 text-white border border-white/30 focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Start Date</label>
              <input
                type="date"
                name="startDate"
                className="w-full p-3 rounded-xl bg-white/20 text-white border border-white/30 focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">End Date</label>
              <input
                type="date"
                name="endDate"
                className="w-full p-3 rounded-xl bg-white/20 text-white border border-white/30 focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "⏳ Creating..." : "🚀 Create Trip"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-6 text-center text-lg font-semibold ${
              message.includes("✅") ? "text-green-300" : "text-red-300"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
