  "use client";
  import React, { useState, useEffect } from "react";
  import style from "./hajj-umrah.module.scss";

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
          const res = await fetch("https://dashboard-rho-lake.vercel.app/api/hajj");
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
        <div className={style.packageContainer}>
          <h1 className="text-2xl font-bold mb-4 text-center">Hajj Packages</h1>
          <p className="text-gray-500 text-center">No packages available.</p>
        </div>
      );

    return (
      <div className={style.packageContainer}>
        <h1 className="text-2xl font-bold mb-6 text-center">Hajj Packages</h1>

        {/* Slider / Grid */}
        <div className={style.slider}>
          {packages.map((pkg, index) => (
            <div key={pkg.id} className={style.slide}>
              <img
                src={pkg.imageUrl}
                alt={`Hajj Package ${index + 1}`}
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://via.placeholder.com/360x502?text=Image+Not+Found")
                }
              />
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className={style.sliderIndicators}>
          {packages.map((_, idx) => (
            <div key={idx} className={`${style.indicator}`}></div>
          ))}
        </div>
      </div>
    );
  }
