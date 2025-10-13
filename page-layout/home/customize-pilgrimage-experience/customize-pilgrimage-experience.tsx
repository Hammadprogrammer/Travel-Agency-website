"use client";
import React, { useEffect, useState } from "react";
import style from "./customize-pilgrimage-experience.module.scss";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { BeatLoader } from "react-spinners";
import Popup from "@/shared-component/package-popup/popup";

interface ApiResponse {
  id: number;
  title: string;
  subtitle1?: string;
  subtitle2?: string;
  subtitle3?: string;
  subtitle4?: string;
  isActive: boolean;
  heroImage?: string;
}

interface PilgrimageItem {
  id: number;
  title: string;
  type: string;
  imageUrl?: string;
  items: string[];
}

export default function Pilgrimage() {
  const [data, setData] = useState<PilgrimageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // ✅ Handle mount + resize
  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Fetch Data
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://dashboard-rho-lake.vercel.app/api/custom-pilgrimage");
        if (!res.ok) throw new Error("Failed to fetch data");

        const json: ApiResponse[] = await res.json();
        const formatted: PilgrimageItem[] = json
          .filter((item) => item.isActive)
          .map((item) => ({
            id: item.id,
            title: item.title,
            type: "Pilgrimage",
            imageUrl: item.heroImage,
            items: [
              item.subtitle1,
              item.subtitle2,
              item.subtitle3,
              item.subtitle4,
            ].filter(Boolean) as string[],
          }));

        setData(formatted);
      } catch (err) {
        console.error("Error fetching pilgrimage data:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (!mounted) return null;

  // ✅ Show loader while fetching
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <BeatLoader color="#4cafef" size={18} margin={3} />
      </div>
    );
  }

  // ✅ If no data, show nothing (hide section)
  if (data.length === 0) return null;

  // ✅ Main render (only when data exists)
  return (
    <section className={style.pilgrimageSection} id="pilgrimage">
      <div className={style.heading}>
        <h3>Customize Your Pilgrimage Experience</h3>
      </div>
      <div className={style.subHeading}>
        <p>
          Select your destinations, holy sites, and transportation to tailor your journey
        </p>
      </div>

      {isMobile ? (
        // ===== Mobile Swiper =====
        <div className={style.mobileSliderWrapper}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={1}
            centeredSlides
            loop
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
          >
            {data.map((box) => (
              <SwiperSlide key={box.id}>
                <PilgrimageBox box={box} onClick={() => setShowPopup(true)} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Prev / Next */}
          <button className="custom-prev absolute left-1 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white text-3xl rounded-full w-10 h-10 flex items-center justify-center z-10">
            ‹
          </button>
          <button className="custom-next absolute right-1 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white text-3xl rounded-full w-10 h-10 flex items-center justify-center z-10">
            ›
          </button>
        </div>
      ) : (
        // ===== Desktop Layout =====
        <div className={style.pilgrimageContainer}>
          {data.map((box) => (
            <PilgrimageBox
              key={box.id}
              box={box}
              onClick={() => setShowPopup(true)}
            />
          ))}
        </div>
      )}

      {/* ✅ Popup */}
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </section>
  );
}

// ✅ Single Box Component
function PilgrimageBox({
  box,
  onClick,
}: {
  box: PilgrimageItem;
  onClick: () => void;
}) {
  return (
    <div className={style.boxes} onClick={onClick}>
      <Image
        src={box.imageUrl || "/placeholder-400x250.png"}
        alt={box.title}
        width={400}
        height={250}
      />
      <h5>{box.title}</h5>
      <div className={style.description}>
        <ul>
          {box.items.map((item, i) => (
            <li key={i}>
              <span className={style.iconWrapper}>
                <FaCheck size={14} color="black" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
