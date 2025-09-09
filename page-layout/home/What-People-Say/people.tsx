"use client";
import React, { useEffect, useState } from "react";
import style from "./people.module.scss";
import Image from "next/image";

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

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("https://dashboard-rho-lake.vercel.app/api/testimonials");
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

  if (testimonials.length === 0) return null;

  return (
    <section>
      <div className={style.peopleSection}>
        <h3>What People Say</h3>
        <p className={style.subHeading}>
          Hear from travelers who trusted us with their spiritual and leisure journeys
        </p>

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
                />
                <div className={style.ceo}>
                  <h5>{testimonial.name}</h5>
                  <p className={style.small}>{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PeopleSection;
