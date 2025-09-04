"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./international.module.scss";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const InternationalTours = () => {
  const [tours, setTours] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const fetchedRef = useRef(false); // ✅ prevent duplicate fetch in StrictMode

  // ✅ Fetch Tours (only once)
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchTours = async () => {
      try {
        const res = await fetch(
          "https://dashboard-rho-lake.vercel.app/api/international-tour"
        );
        const data = await res.json();
        const formatted = data
          .filter((tour: any) => tour.sliderImages.length > 0)
          .map((tour: any) => ({
            src: tour.sliderImages[0].url,
            title: tour.title,
            description: tour.description,
          }));
        setTours(formatted);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
  }, []);

  // ✅ Screen resize detection
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
    <section className={style.internationalTourSection}>
      <div className={style.contentSection}>
        <h3>International Tours</h3>
        <p>
          Explore our top-rated international travel packages. Designed for
          comfort, adventure, and affordability.
        </p>
      </div>

      <div className={style.sliderContainer}>
        {/* ✅ Mobile: Swiper */}
        {isMobile ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
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
                  <div className={style.imageOverlay}>
                    <h4>{tour.title}</h4>
                    <p>{tour.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <>
            {/* ✅ Desktop: Custom Slider */}
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
                  transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
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
                    <div className={style.imageOverlay}>
                      <h4>{tour.title}</h4>
                      <p>{tour.description}</p>
                    </div>
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
