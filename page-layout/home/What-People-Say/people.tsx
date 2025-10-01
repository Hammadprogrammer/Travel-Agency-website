"use client";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(
          "https://dashboard-rho-lake.vercel.app/api/testimonials"
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setTestimonials(data);
        }
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

  return (
    <section className={style.peopleSection}>
      <h3>What People Say</h3>
      <p className={style.subHeading}>
        Hear from travelers who trusted us with their spiritual and leisure journeys
      </p>

      {isMobile ? (
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={15}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className={style.box}>
                  <div className={style.topSection}>
                    <p className={style.margin}>{testimonial.rating.toFixed(2)}</p>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="fa fa-star"></span>
                    ))}
                  </div>
                  <p className={style.styleText}>{testimonial.description}</p>
                  <div className={style.bottomSection}>
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={50}
                      height={50}
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

          {/* Arrows */}
          <button className="custom-prev absolute left-[-20px] top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white text-2xl rounded-full w-10 h-10 flex items-center justify-center z-10">
            ‹
          </button>
          <button className="custom-next absolute right-[-20px] top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white text-2xl rounded-full w-10 h-10 flex items-center justify-center z-10">
            ›
          </button>
        </div>
      ) : (
        <div className={style.boxes}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={style.box}>
              <div className={style.topSection}>
                <p className={style.margin}>{testimonial.rating.toFixed(2)}</p>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="fa fa-star"></span>
                ))}
              </div>
              <p className={style.styleText}>{testimonial.description}</p>
              <div className={style.bottomSection}>
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={50}
                  height={50}
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
