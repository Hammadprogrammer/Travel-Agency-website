"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./hajj-umrah.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { BeatLoader } from "react-spinners";
import Popup from "@/shared-component/package-popup/popup";

interface HajjPackage {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  createdAt: string;
  isActive: boolean;
  category: string;
}

export default function HajjPackages() {
  const [packages, setPackages] = useState<HajjPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const swiperRef = useRef<any>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch("https://dashboard-rho-lake.vercel.app/api/hajj");
        if (!res.ok) throw new Error("Failed to fetch packages");

        const data: HajjPackage[] = await res.json();
        const categoryOrder = ["economic", "standard", "premium"];

        const filteredData = Array.isArray(data)
          ? data
              .filter((pkg) => pkg.isActive)
              .sort(
                (a, b) =>
                  categoryOrder.indexOf(a.category.toLowerCase()) -
                  categoryOrder.indexOf(b.category.toLowerCase())
              )
          : [];

        setPackages(filteredData);
      } catch (err) {
        console.error("Error fetching packages:", err);
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

  if (packages.length === 0) return null;

  return (
    <div className={style.packageContainer} id="hajj">
      <h1 className="text-2xl font-bold mb-6 text-center text-black">
        Hajj Packages
      </h1>

      {isMobile ? (
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={1}
            centeredSlides
            loop
            onSwiper={(swiper) => (swiperRef.current = swiper)} 
          >
            {packages.map((pkg, index) => (
              <SwiperSlide key={pkg.id}>
                <div className={style.slide}>
                  <img
                    src={pkg.imageUrl}
                    alt={`Hajj Package ${index + 1}`}
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://via.placeholder.com/360x502?text=Image+Not+Found")
                    }
                    onClick={() => setIsPopupOpen(true)}
                    className="cursor-pointer w-full h-auto object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            ref={prevRef}
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white text-3xl rounded-full w-10 h-10 flex items-center justify-center z-10"
          >
            ‹
          </button>

          <button
            ref={nextRef}
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white text-3xl rounded-full w-10 h-10 flex items-center justify-center z-10"
          >
            ›
          </button>
        </div>
      ) : (
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
                onClick={() => setIsPopupOpen(true)}
                className="cursor-pointer"
              />
            </div>
          ))}
        </div>
      )}

      {isPopupOpen && (
        <Popup
          onClose={() => setIsPopupOpen(false)}
          initialService="Hajj Packages"
        />
      )}
    </div>
  );
}
