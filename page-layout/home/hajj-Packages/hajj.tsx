"use client";
import React, { useState, useEffect } from "react";

interface HajjPackage {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  createdAt: string;
}

export default function HajjPackages() {
  const [packages, setPackages] = useState<HajjPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch("http://localhost:3001/api/hajj"); 
        if (!res.ok) throw new Error("Failed to fetch packages");

        const data: HajjPackage[] = await res.json();
        setPackages(Array.isArray(data) ? data : []);
      } catch {
        setPackages([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Loading packages...</p>;

  if (packages.length === 0)
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Available Hajj Packages</h1>
        <p className="text-gray-500">No packages available.</p>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Hajj Packages</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="border rounded-lg shadow p-4 hover:shadow-md transition">
            <img
              src={pkg.imageUrl}
              alt={pkg.title}
              className="w-full h-40 object-cover rounded"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.src = "https://via.placeholder.com/300x150?text=Image+Not+Found";
              }}
            />
            <h2 className="text-lg font-semibold mt-2">{pkg.title}</h2>
            <p className="text-gray-600">${pkg.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
