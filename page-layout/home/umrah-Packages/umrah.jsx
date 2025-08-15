"use client";
import React, { useState, useEffect } from "react";
import style from "./umrah.jsx.module.scss";
import Image from "next/image";

const UmrahPakage = () => {
  const images = [
    "/umrah.png",
    "/umrah.png",
    "/umrah.png",

  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Go to next image
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Auto change every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={style.whyChooseUsSection}>
      <div className={style.container}>
        <h2 className={style.header}>
         Umrah Packages
        </h2>

        {/* Desktop Grid */}
        <div className={style.desktopView}>
          <div className={style.imageGrid}>
            {images.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Slide ${index + 1}`}
                width={400}
                height={300}
              />
            ))}
          </div>
        </div>

        {/* Mobile Slider */}
        <div className={style.mobileView}>
          <div className={style.slider}>
            <div className={style.slide}>
              <Image
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                width={400}
                height={300}
              />
            </div>
          </div>

          {/* Dots Navigation */}
          <div className={style.sliderIndicators}>
            {images.map((_, index) => (
              <div
                key={index}
                className={`${style.indicator} ${
                  index === currentIndex ? style.active : ""
                }`}
                onClick={() => setCurrentIndex(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UmrahPakage;
