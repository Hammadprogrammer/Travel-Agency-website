"use client";
import React from "react";
import style from "./customize-pilgrimage-experience.module.scss";
import Image from "next/image";
import { FaCheck } from "react-icons/fa"; // ✅ check icon

const Pilgrimage = () => {
  return (
    <section>
      <div className={style.main}>
      <div className={style.pilgrimageSection}>
        <div className={style.heading}>
          <h3>Customize Your Pilgrimage Experience</h3>
        </div>

        <div className={style.subHeading}>
          <p>
            Select your destinations, holy sites, and transportation to tailor
            your journey
          </p>
        </div>

        <div className={style.pilgrimageContainer}>
          {/* Box 1 */}
          <div className={style.boxes}>
            <Image
              src="/makkah.png"
              alt="Makkah Zyarat"
              width={400}
              height={250}
            />
            <h5>Makkah Zyarat</h5>
            <div className={style.description}>
              <ul>
                {["Taif", "Jurana", "Kiswah Factory", "Hudebia"].map((item, i) => (
                  <li key={i}>
                    <span className={style.iconWrapper}>
                      <FaCheck size={14} color="black" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Box 2 */}
          <div className={style.boxes}>
            <Image
              src="/madinah.png"
              alt="Madina Zyarat"
              width={400}
              height={250}
            />
            <h5>Madina Zyarat</h5>
            <div className={style.description}>
              <ul>
                {["Masjid Al Qiblatayn", "Mount Arafat", "Badar", "Mina"].map(
                  (item, i) => (
                    <li key={i}>
                      <span className={style.iconWrapper}>
                        <FaCheck size={14} color="black" />
                      </span>
                      <span>{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Box 3 */}
          <div className={style.boxes}>
            <Image
              src="/Intercity-Transport.png"
              alt="Intercity Transport"
              width={400}
              height={250}
            />
            <h5>Intercity Transport</h5>
            <div className={style.description}>
              <ul>
                {["7 Seater", "GMC", "Hiace", "Sharing Bus"].map((item, i) => (
                  <li key={i}>
                    <span className={style.iconWrapper}>
                      <FaCheck size={14} color="black" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
    
  );
};

export default Pilgrimage;
