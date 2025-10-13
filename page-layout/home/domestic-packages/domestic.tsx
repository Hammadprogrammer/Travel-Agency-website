"use client";
import React, { useState, useEffect } from "react";
import style from "./domestic.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { BeatLoader } from "react-spinners";
import Popup from "@/shared-component/package-popup/popup";

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
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch("https://dashboard-rho-lake.vercel.app/api/domestic");
        if (!res.ok) throw new Error("Failed to fetch domestic packages");

        const data: DomesticPackage[] = await res.json();
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

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const scrollTarget = params.get("scroll");

    if (scrollTarget === "destinations") {
      const section = document.querySelector(".destination-section");
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 800);
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <BeatLoader color="#4cafef" size={18} margin={3} />
      </div>
    );
  }

  if (packages.length === 0)return 

  return (
    <section className={`${style.whyChooseUsSection} destination-section`}>
      <div className={style.container}>
        <h2 className={style.header}>Domestic Packages</h2>

        {isMobile ? (
          <div className="relative">
            <Swiper
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView={1}
              centeredSlides={true}
              loop={true}
              navigation={{
                prevEl: ".domestic-prev",
                nextEl: ".domestic-next",
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

            {/* Left Arrow */}
            <button className="domestic-prev absolute left-1 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white text-3xl rounded-full w-10 h-10 flex items-center justify-center z-10">
              ‹
            </button>
            {/* Right Arrow */}
            <button className="domestic-next absolute right-1 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white text-3xl rounded-full w-10 h-10 flex items-center justify-center z-10">
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

      {/* Popup */}
      {isPopupOpen && <Popup onClose={() => setIsPopupOpen(false)} initialService="Domestic Packages"/>}
    </section>
  );
}
