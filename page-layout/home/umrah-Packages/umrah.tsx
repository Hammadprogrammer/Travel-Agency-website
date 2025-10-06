"use client";
import React, { useState, useEffect } from "react";
import style from "./umrah.jsx.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { BeatLoader } from "react-spinners";
import Popup from "@/shared-component/package-popup/popup";
import { usePathname, useSearchParams } from "next/navigation";

interface UmrahPackage {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  createdAt: string;
  isActive: boolean;
  category: string;
}

export default function UmrahPackages() {
  const [packages, setPackages] = useState<UmrahPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch(
          "https://dashboard-rho-lake.vercel.app/api/umrah"
        );
        if (!res.ok) throw new Error("Failed to fetch packages");

        const data: UmrahPackage[] = await res.json();

        const categoryOrder = ["economic", "standard", "premium"];

        const filteredAndSortedData = Array.isArray(data)
          ? data
              .filter((pkg) => pkg.isActive)
              .sort(
                (a, b) =>
                  categoryOrder.indexOf(a.category.toLowerCase()) -
                  categoryOrder.indexOf(b.category.toLowerCase())
              )
          : [];

        setPackages(filteredAndSortedData);
      } catch (err) {
        console.error("Error fetching Umrah packages:", err);
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

  // Smooth scroll on load if hash exists
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 100); // slight delay to wait for render
        }
      }
    }
  }, [packages]);

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
          Umrah Packages
        </h2>
        <p className="text-gray-500 text-center">No packages available.</p>
      </div>
    );

  return (
    <section className={style.whyChooseUsSection} id="umrah">
      <div className={style.container}>
        <h2 className={style.header}>Umrah Packages</h2>

        {isMobile ? (
          <div className="relative">
            <Swiper
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView={1}
              centeredSlides={true}
              loop={true}
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }}
            >
              {packages.map((pkg) => (
                <SwiperSlide key={pkg.id}>
                  <div
                    className={style.slide}
                    onClick={() => setIsPopupOpen(true)}
                  >
                    <img
                      src={pkg.imageUrl}
                      alt={pkg.title}
                      onError={(e) =>
                        (e.currentTarget.src =
                          "https://via.placeholder.com/360x502?text=Image+Not+Found")
                      }
                      className="cursor-pointer w-full h-auto object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button className="custom-prev absolute left-1 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white text-3xl rounded-full w-10 h-10 flex items-center justify-center z-10">
              ‹
            </button>
            <button className="custom-next absolute right-1 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white text-3xl rounded-full w-10 h-10 flex items-center justify-center z-10">
              ›
            </button>
          </div>
        ) : (
          <div className={style.imageGrid}>
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={style.slide}
                onClick={() => setIsPopupOpen(true)}
              >
                <img
                  src={pkg.imageUrl}
                  alt={pkg.title}
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://via.placeholder.com/360x502?text=Image+Not+Found")
                  }
                  className="cursor-pointer"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {isPopupOpen && <Popup onClose={() => setIsPopupOpen(false)} />}
    </section>
  );
}
