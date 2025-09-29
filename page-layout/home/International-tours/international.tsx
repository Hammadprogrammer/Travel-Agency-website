"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./international.module.scss";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface InternationalData {
  id: number;
  title: string;
  description: string;
  backgroundUrl: string;
  sliderImages: { url: string }[];
}

const InternationalTours = () => {
  const [tours, setTours] = useState<any[]>([]);
  const [sectionData, setSectionData] = useState<InternationalData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const fetchedRef = useRef(false);

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
          setSectionData({
            id: data[0].id,
            title: data[0].title,
            description: data[0].description,
            backgroundUrl: data[0].backgroundUrl,
            sliderImages: data[0].sliderImages,
          });

          const formatted = data
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
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1200);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

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

  return (
    <section
      className={style.internationalTourSection}
      style={{
        backgroundImage: sectionData
          ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${sectionData.backgroundUrl})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      
    >
      <div className={style.contentSection}>
        <h3 id="holiday">{sectionData?.title}</h3>
        <p>{sectionData?.description}</p>
      </div>

      <div className={style.sliderContainer}>
        {/* ✅ Mobile: Swiper */}
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
                <div className={style.slide}>
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
                  <div key={index} className={style.slide}>
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
    </section>
  );
};

export default InternationalTours;
