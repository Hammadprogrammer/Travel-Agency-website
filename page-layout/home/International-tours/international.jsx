"use client";
import React, { useState, useEffect } from "react";
import style from "./international.module.scss";
import Image from "next/image";

const InternationalTours = () => {
  const images = [
    { src: "/maldives.png", title: "Maldives" },
    { src: "/malaysia.png", title: "Malaysia" },
    { src: "/dubai.png", title: "Dubai" },
    { src: "/malaysia.png", title: "Malaysia" },
    { src: "/dubai.png", title: "Dubai" },                            
    { src: "/maldives.png", title: "Maldives" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // detect screen size
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1200);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // autoplay on mobile
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        handleNext();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  const visibleSlides = isMobile ? 1 : 3;

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - visibleSlides : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= images.length - visibleSlides ? 0 : prev + 1
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
        {!isMobile && (
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
            {images.map((img, index) => (
              <div key={index} className={style.slide}>
                <Image
                  src={img.src}
                  alt={img.title}
                  width={500}
                  height={350}
                  className={style.slideImage}
                />
                <div className={style.imageOverlay}>
                  <h4>{img.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {!isMobile && (
          <button
            className={`${style.customButton} ${style.next}`}
            onClick={handleNext}
          >
            &#10095;
          </button>
        )}
      </div>
    </section>
  );
};

export default InternationalTours;
