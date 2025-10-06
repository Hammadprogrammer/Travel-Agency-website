"use client";
import React, { useState } from "react";
import style from "./hero.module.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";
import Popup from "@/shared-component/package-popup/popup"; 
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Hero = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <header className={style.heroImage}>
      <div className={style.headerContent}>
        <div className={style.heroTextMain}>
          <div className={style.heroText}>
            <h1>From Intention to Completion We’re with You</h1>
            <p>
              Trusted Hajj & Umrah Packages Designed for a Peaceful Pilgrimage.
              Let Al Mualim Travels handle every detail, so you can focus on your
              faith.
            </p>
          </div>

          <div className={style.heroTextTwo}>
            <h1>ارادے سے تکمیل تک ہم آپ کے ساتھ ہیں</h1>
            <p>
              پُر اعتماد حج و عمرہ پیکجز جو آپ کے سفر کو پُرسکون بنائیں۔
              ہر تفصیل کا خیال رکھے گا "المُعلّم ٹریولز"، تاکہ آپ اپنی عبادت پر توجہ دے سکیں۔
            </p>
          </div>
        </div>

<div className={style.btnWrapper}>
  <div className={style.btnBox}>
    <Link href="#hajj">
      <button className={style.btn1}>EXPLORE PACKAGES</button>
    </Link>
  </div>
  <div className={style.btnBox}>
    <button className={style.btn2} onClick={() => setIsPopupOpen(true)}>
      BOOK YOUR JOURNEY
    </button>
  </div>
</div>

      </div>

      <div className={style.socialIcons}>
            <a href="https://www.facebook.com/Almuallimtravels/"><FaFacebookF /></a>
            <a href="https://www.instagram.com/almuallimtravels/#"><FaInstagram /></a>
            <a href="https://www.youtube.com/@almuallimtravels"><FaYoutube /></a>
      </div>

      {isPopupOpen && <Popup onClose={() => setIsPopupOpen(false)} />}
    </header>
  );
};

export default Hero;
