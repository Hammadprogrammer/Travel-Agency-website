"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./international.module.scss";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Popup from "@/shared-component/package-popup/popup";

interface InternationalData {
  id: number;
  title: string;
  description: string;
  backgroundUrl: string;
  sliderImages: { url: string }[];
}

interface SliderTour {
  src: string;
  title: string;
  description: string;
}

const InternationalTours = () => {
  const [tours, setTours] = useState<SliderTour[]>([]);
  const [sectionData, setSectionData] = useState<InternationalData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const fetchedRef = useRef(false);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedTour, setSelectedTour] = useState<SliderTour | null>(null);

  // Fetch international tours once
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchTours = async () => {
      try {
        const res = await fetch(
          "https://dashboard-rho-lake.vercel.app/api/international-tour"
        );
        const data: InternationalData[] = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setSectionData(data[0]);

          const formatted: SliderTour[] = data
            .filter((tour) => tour.sliderImages.length > 0)
            .map((tour) => ({
              src: tour.sliderImages[0].url,
              title: tour.title,
              description: tour.description,
            }));
          setTours(formatted);
        }
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
  }, []);

  // Check for mobile view
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1200);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth scroll on load if hash exists (dynamic like Umrah)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 100); // slight delay for render
        }
      }
    }
  }, [sectionData]);

  const visibleSlides = 3;

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? tours.length - visibleSlides : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= tours.length - visibleSlides ? 0 : prev + 1
    );
  };

  const handleSlideClick = (tour: SliderTour) => {
    setSelectedTour(tour);
    setShowPopup(true);
  };

  return (
    <section
      className={style.internationalTourSection}
      id="holiday"
      style={{
        backgroundImage: sectionData
          ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${sectionData.backgroundUrl})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={style.contentSection}>
        <h3>{sectionData?.title}</h3>
        <p>{sectionData?.description}</p>
      </div>

      <div className={style.sliderContainer}>
        {isMobile ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1.2}
            loop={true}
            className={style.mobileSwiper}
          >
            {tours.map((tour, index) => (
              <SwiperSlide key={index}>
                <div
                  className={style.slide}
                  onClick={() => handleSlideClick(tour)}
                >
                  <Image
                    src={tour.src}
                    alt={tour.title}
                    width={500}
                    height={350}
                    className={style.slideImage}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <>
            {tours.length > 0 && (
              <button
                className={`${style.customButton} ${style.prev}`}
                onClick={handlePrev}
              >
                &#10094;
              </button>
            )}

            <div className={style.sliderWrapper}>
              <div
                className={style.sliderTrack}
                style={{
                  transform: `translateX(-${
                    currentIndex * (100 / visibleSlides)
                  }%)`,
                }}
              >
                {tours.map((tour, index) => (
                  <div
                    key={index}
                    className={style.slide}
                    onClick={() => handleSlideClick(tour)}
                  >
                    <Image
                      src={tour.src}
                      alt={tour.title}
                      width={500}
                      height={350}
                      className={style.slideImage}
                    />
                  </div>
                ))}
              </div>
            </div>

            {tours.length > 0 && (
              <button
                className={`${style.customButton} ${style.next}`}
                onClick={handleNext}
              >
                &#10095;
              </button>
            )}
          </>
        )}
      </div>

      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </section>
  );
};

export default InternationalTours;
