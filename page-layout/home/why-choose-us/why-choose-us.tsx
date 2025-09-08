"use client";
import React, { useEffect, useState } from "react";
import style from "./why-choose-us.module.scss";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";

interface ChooseUsItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  isActive?: boolean;
}

const ChooseUs = () => {
  const [items, setItems] = useState<ChooseUsItem[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchChooseUs = async () => {
      try {
        const res = await fetch(
          "https://dashboard-rho-lake.vercel.app/api/why-choose-us"
        );
        const result = await res.json();
        if (Array.isArray(result)) {
          setItems(result.filter((item) => item.isActive));
        }
      } catch (error) {
        console.error("Error fetching choose us data:", error);
      }
    };

    fetchChooseUs();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (items.length === 0) return null;

  return (
    <section className={style.chooseUsSection}>
      <div className={style.content}>
        <h3>Why Choose Us</h3>
        <p style={{ color: "#000" }}>
          We provide the best travel services ensuring comfort, affordability
          and global reach.
        </p>

        {isMobile ? (
          <Swiper
            className={style.mobileSwiper}
            spaceBetween={15}
            slidesPerView={1.2}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
          >
            {items.map((item, index) => (
              <SwiperSlide key={item.id}>
                <div
                  className={`${style.box} ${
                    index === 0 ? style.color : index === 1 ? style.color1 : ""
                  }`}
                >
                  <div className={style.imgWrap}>
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={60}
                      height={60}
                    />
                  </div>
                  <div className={style.chooseUsContent}>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={style.chooseContainer}>
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`${style.box} ${
                  index === 0 ? style.color : index === 1 ? style.color1 : ""
                }`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={60}
                  height={60}
                />
                <div className={style.chooseUsContent}>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ChooseUs;
