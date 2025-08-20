"use client";
import React from "react";
import style from "./customize-pilgrimage-experience.module.scss";
import Image from "next/image";

const Pilgrimage = () => {
  return (
    <section>
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
                <li>
                  <Image
                    className={style.check}
                    src="/logos/Checked Checkbox.png"
                    alt="Taif"
                    width={25}
                    height={25}
                  />
                  <span>Taif</span>
                </li>
                <li>
                  <Image
                    className={style.check}
                    src="/logos/Checked Checkbox.png"
                    alt="Jurana"
                    width={25}
                    height={25}
                  />
                  <span>Jurana</span>
                </li>
                <li>
                  <Image
                    className={style.check}
                    src="/logos/Checked Checkbox.png"
                    alt="Kiswah Factory"
                    width={25}
                    height={25}
                  />
                  <span>Kiswah Factory</span>
                </li>
                <li>
                  <Image
                    className={style.check}
                    src="/logos/Checked Checkbox.png"
                    alt="Hudebia"
                    width={25}
                    height={25}
                  />
                  <span>Hudebia</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Box 2 */}
          <div className={style.boxes}>
            <Image
              src="/images/image (3).png"
              alt="Madina Zyarat"
              width={400}
              height={250}
            />
            <h5>Madina Zyarat</h5>
            <div className={style.description}>
              <ul>
                <li>
                  <Image
                    className={style.check}
                    src="/logos/Checked Checkbox.png"
                    alt="Masjid Al Qiblatayn"
                    width={25}
                    height={25}
                  />
                  <span>Masjid Al Qiblatayn</span>
                </li>
                <li>
                  <Image
                    className={style.check}
                    src="/logos/Checked Checkbox.png"
                    alt="Mount Arafat"
                    width={25}
                    height={25}
                  />
                  <span>Mount Arafat</span>
                </li>
                <li>
                  <Image
                    className={style.check}
                    src="/logos/Checked Checkbox.png"
                    alt="Badar"
                    width={25}
                    height={25}
                  />
                  <span>Badar</span>
                </li>
                <li>
                  <Image
                    className={style.check}
                    src="/logos/Checked Checkbox.png"
                    alt="Mina"
                    width={25}
                    height={25}
                  />
                  <span>Mina</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Box 3 */}
          <div className={style.boxes}>
            <Image
              src="/images/image (4).png"
              alt="Intercity Transport"
              width={400}
              height={250}
            />
            <h5>Intercity Transport</h5>
            <div className={style.description}>
              <ul>
                <li>
                  <Image
                    className={style.check}
                    src="/logos/Checked Checkbox.png"
                    alt="7 Seater"
                    width={25}
                    height={25}
                  />
                  <span>7 Seater</span>
                </li>
                <li>
                  <Image
                    className={style.check}
                    src="/logos/Checked Checkbox.png"
                    alt="GMC"
                    width={25}
                    height={25}
                  />
                  <span>GMC</span>
                </li>
                <li>
                  <Image
                    className={style.check}
                    src="/logos/Checked Checkbox.png"
                    alt="Hiace"
                    width={25}
                    height={25}
                  />
                  <span>Hiace</span>
                </li>
                <li>
                  <Image
                    className={style.check}
                    src="/logos/Checked Checkbox.png"
                    alt="Sharing Bus"
                    width={25}
                    height={25}
                  />
                  <span>Sharing Bus</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pilgrimage;
