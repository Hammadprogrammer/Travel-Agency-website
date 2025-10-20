"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./video.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const VIDEOS = [
  "/about1.mp4",
  "/about2.mp4",
  "/about3.mp4",
  "/about4.mp4",
  "/about5.mp4",
  "/about6.mp4",
  "/about7.mp4",
];

const VideoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const visibleSlides = 3;
  const fetchedRef = useRef(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1200);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? VIDEOS.length - visibleSlides : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= VIDEOS.length - visibleSlides ? 0 : prev + 1
    );
  };

  return (
    <section className={style.videoSection}>
      <div className={style.contentSection}>
        <h3>Journey Through Nature’s Wonders"</h3>
        <p>Experience the breathtaking beauty of Pakistan’s northern valleys through stunning visuals that capture nature’s true wonders</p>
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
            {VIDEOS.map((video, index) => (
              <SwiperSlide key={index}>
                <div className={style.slide}>
                  <div className={style.videoWrapper}>
                    <video
                      src={video}
                      controls
                      playsInline
                      preload="metadata"
                      className={style.video}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <>
            <button
              className={`${style.customButton} ${style.prev}`}
              onClick={handlePrev}
            >
              &#10094;
            </button>

            <div className={style.sliderWrapper}>
              <div
                className={style.sliderTrack}
                style={{
                  transform: `translateX(-${
                    currentIndex * (100 / visibleSlides)
                  }%)`,
                }}
              >
                {VIDEOS.map((video, index) => (
                  <div key={index} className={style.slide}>
                    <div className={style.videoWrapper}>
                      <video
                        src={video}
                        controls
                        playsInline
                        preload="metadata"
                        className={style.video}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className={`${style.customButton} ${style.next}`}
              onClick={handleNext}
            >
              &#10095;
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default VideoSlider;
