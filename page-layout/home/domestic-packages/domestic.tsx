"use client";
import React, { useState, useEffect } from "react";
import style from "./domestic.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { BeatLoader } from "react-spinners";

interface DomesticPackage {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  createdAt: string;
  isActive: boolean;
  category: string;
}

export default function DomesticPackages() {
  const [packages, setPackages] = useState<DomesticPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch("https://dashboard-rho-lake.vercel.app/api/domestic");
        if (!res.ok) throw new Error("Failed to fetch domestic packages");

        const data: DomesticPackage[] = await res.json();

        const categoryOrder = ["economic", "standard", "premium"];

        const filteredAndSortedData = Array.isArray(data)
          ? data
              .filter((pkg) => pkg.isActive) // sirf active packages
              .sort(
                (a, b) =>
                  categoryOrder.indexOf(a.category.toLowerCase()) -
                  categoryOrder.indexOf(b.category.toLowerCase())
              )
          : [];

        setPackages(filteredAndSortedData);
      } catch (err) {
        console.error("Error fetching Domestic packages:", err);
        setPackages([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <BeatLoader color="#4cafef" size={18} margin={3} />
      </div>
    );
  }

  if (packages.length === 0)
    return (
      <div className={style.container}>
        <h2 className="text-3xl font-bold mb-4 text-center text-black">
          Domestic Packages
        </h2>
        <p className="text-gray-500 text-center">No packages available.</p>
      </div>
    );

  return (
    <section className={style.whyChooseUsSection}>
      <div className={style.container}>
        <h2 className={style.header}>Domestic Packages</h2>

        {isMobile ? (
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView={1.2}
            loop={true}
          >
            {packages.map((pkg) => (
              <SwiperSlide key={pkg.id}>
                <div className={style.slide}>
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://via.placeholder.com/360x502?text=Image+Not+Found")
                    }
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={style.imageGrid}>
            {packages.map((pkg) => (
              <div key={pkg.id} className={style.slide}>
                <img
                  src={pkg.imageUrl}
                  alt={pkg.title}
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://via.placeholder.com/360x502?text=Image+Not+Found")
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
