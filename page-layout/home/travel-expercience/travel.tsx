"use client";
import React, { useState } from "react";
import style from "./travel.module.scss";
import Image from "next/image";
import Link from "next/link";
import Popup from "@/shared-component/package-popup/popup";

const Experience = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");

  const handleOpenPopup = (service: string) => {
    setSelectedService(service);
    setShowPopup(true);
  };

  return (
    <>
      <section className={style.experienceSection}>
        <div className={style.experienceTopSection}>
          <div className={style.line}></div>
          <p className={style.color}>
            Things To Make An Enriching An Memorable
          </p>
          <div className={style.line}></div>
        </div>
        <h3>Travel Experience</h3>

        <div className={style.boxes}>
          <Link href="#hajj">
            <div className={style.group}>
              <div className={style.box}>
                <Image src="/Hajj.png" alt="Hajj" width={80} height={80} />
              </div>
              <p>Hajj</p>
            </div>
          </Link>

          <Link href="#umrah">
            <div className={style.group}>
              <div className={`${style.box} ${style.change}`}>
                <Image src="/Mosque.png" alt="Umrah" width={80} height={80} />
              </div>
              <p className={style.chang}>Umrah</p>
            </div>
          </Link>

          <Link href="#holiday">
            <div className={style.group}>
              <div className={style.box}>
                <Image src="/Umbrella.png" alt="Holidays" width={80} height={80} />
              </div>
              <p>Holidays</p>
            </div>
          </Link>

          <div
            className={style.group}
            onClick={() => handleOpenPopup("Tickets")}
            style={{ cursor: "pointer" }}
          >
            <div className={`${style.box} ${style.change}`}>
              <Image src="/Tickets.png" alt="Tickets" width={80} height={80} />
            </div>
            <p className={style.chang}>Tickets</p>
          </div>

          <div
            className={style.group}
            onClick={() => handleOpenPopup("Visa")}
            style={{ cursor: "pointer" }}
          >
            <div className={style.box}>
              <Image src="/Passport.png" alt="Visa" width={80} height={80} />
            </div>
            <p>Visa</p>
          </div>
        </div>
      </section>

      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </>
  );
};

export default Experience;
