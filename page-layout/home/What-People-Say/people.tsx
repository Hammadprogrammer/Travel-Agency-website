"use client";
import React, { useEffect, useState, useRef } from "react";
import style from "./people.module.scss";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface Testimonial {
  id: number;
  rating: number;
  description: string;
  image: string;
  name: string;
  title: string;
}

const PeopleSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(
          "https://dashboard-rho-lake.vercel.app/api/testimonials"
        );
        const data = await res.json();
        if (Array.isArray(data)) setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (testimonials.length === 0) return null;

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="fa fa-star text-yellow-400"></span>
        ))}
        {hasHalf && <span className="fa fa-star-half text-yellow-400"></span>}
      </>
    );
  };

  return (
    <section className={style.peopleSection}>
      <h3>What People Say</h3>
      <p className={style.subHeading}>
        Hear from travelers who trusted us with their spiritual and leisure journeys
      </p>

      {isMobile ? (
        <div className="relative flex justify-center items-center overflow-visible">
          <Swiper
            modules={[Navigation]}
            spaceBetween={15}
            slidesPerView={1}
            centeredSlides
            loop
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="max-w-[90%] mx-auto"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className={style.box}>
                  <div className={style.topSection}>
                    <p className={style.margin}>{testimonial.rating.toFixed(1)}</p>
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className={style.styleText}>{testimonial.description}</p>
                  <div className={style.bottomSection}>
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className={style.circleImage}
                    />
                    <div>
                      <h5>{testimonial.name}</h5>
                      <p className={style.small}>{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white text-3xl rounded-full w-12 h-12 flex items-center justify-center z-[100] shadow-lg transition-all"
          >
            ‹
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white text-3xl rounded-full w-12 h-12 flex items-center justify-center z-[100] shadow-lg transition-all"
          >
            ›
          </button>
        </div>
      ) : (
        <div className={`${style.boxes} flex justify-center gap-6`}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={style.box}>
              <div className={style.topSection}>
                <p className={style.margin}>{testimonial.rating.toFixed(1)}</p>
                {renderStars(testimonial.rating)}
              </div>
              <p className={style.styleText}>{testimonial.description}</p>
              <div className={style.bottomSection}>
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className={style.circleImage}
                />
                <div>
                  <h5>{testimonial.name}</h5>
                  <p className={style.small}>{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PeopleSection;
