"use client";
import React from "react";
import style from "./travel.module.scss";
import Image from "next/image";

const Experience = () => {
  return (
    <>
      {/* Experience Section */}
      <section className={style.experienceSection}>
        <div className={style.experienceTopSection}>
          <div className={style.line}></div>
          <p className={style.color}>Things To Make An Enriching An Memorable</p>
          <div className={style.line}></div>
        </div>
        <h3>Travel Experience</h3>

        <div className={style.boxes}>
          <div className={style.group}>
            <div className={style.box}>

            <Image src="/hajj.png" alt="Hajj" width={80} height={80} />

            </div>
            <p>Hajj</p>
          </div>

          <div className={style.group}>
            <div className={`${style.box} ${style.change}`}>
              <Image src="/Mosque.png" alt="Umrah" width={80} height={80} />
            </div>
            <p className={style.chang}>Umrah</p>
          </div>

          <div className={style.group}>
            <div className={style.box}>
              <Image src="/Umbrella.png" alt="Holidays" width={80} height={80} />
            </div>
            <p>Holidays</p>
          </div>

          <div className={style.group}>
            <div className={`${style.box} ${style.change}`}>
              <Image src="/Tickets.png" alt="Tickets" width={80} height={80} />
            </div>
            <p className={style.chang}>Tickets</p>
          </div>

          <div className={style.group}>
            <div className={style.box}>
              <Image src="/Passport.png" alt="Visa" width={80} height={80} />
            </div>
            <p>Visa</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
    
    </>
  );
};

export default Experience;
