"use client";
import React from "react";
import style from "./why-choose-us.module.scss";
import Image from "next/image";

const ChooseUs = () => {
  return (
    <section className={style.chooseUsSection}>
      <div className={style.content}>
        <h3>Why Choose Us</h3>

        <div className={style.chooseContainer}>
          {/* Card 1 */}
          <div className={`${style.box} ${style.color}`}>
            <Image
              src="/EarthPlanet.png"
              alt="Earth"
              width={60}
              height={60}
            />
            <div className={style.chooseUsContent}>
              <h4>Calculated Weather</h4>
              <p>
                Offers global travel options, ensuring customers can explore any
                destination with comprehensive international support.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className={`${style.box} ${style.color1}`}>
            <Image
              src="/Commercial.png"
              alt="Pricing"
              width={60}
              height={60}
            />
            <div className={style.chooseUsContent}>
              <h4>Competitive Pricing</h4>
              <p>
                Provides cost-effective travel solutions, ensuring value for
                money without compromising service quality.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className={style.box}>
            <Image
              src="/OpenSign.png"
              alt="Support"
              width={60}
              height={60}
            />
            <div className={style.chooseUsContent}>
              <h4>Best Support 24/7</h4>
              <p>
                Provides round-the-clock customer support, ensuring assistance
                is always available whenever needed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Shapes */}
      {/* <div className={style.line1}></div>
      <div className={style.line2}></div>
      <div className={style.circle}></div> */}
    </section>
  );
};

export default ChooseUs;
