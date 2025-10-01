"use client";
import React from "react";
import style from "./footer.module.scss";
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.lastSection}>
        {/* Top Part */}
        <div className={style.bottomOne}>
          {/* Logo */}
          <div className={`${style.box} ${style.logoBox}`}>
            <Image src="/logo.png" alt="logo" width={80} height={40} />
            <p>
              At Al Muallim Travels in Pakistan, we specialize in seamless Hajj
              and Umrah packages, offering visa assistance, 4- and 5-star hotel
              bookings, and comfortable transport in Makkah and Madinah. Alongside
              our religious travel services, we provide customized domestic and
              international tours for families, individuals, and corporate clients.
              
            </p>
          </div>

          {/* Wrap Quick + Offices + Contact for mobile row */}
          <div className={style.bottomGroup}>
            {/* Quick Links */}
          <div className={style.box}>
            <h4 className={style.quick}>Quick Links</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="#umrah">Umrah Packages</Link></li>
              <li><Link href="#international">International Tour</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

            {/* Offices */}
            <div className={`${style.box} ${style.officesBox}`}>
           
              <p>
                <b>Office Address</b> <br />
                Office # 58, 4th Floor, RJ Mall, Main Rashid Minhas Road, Karachi., Karachi, Pakistan
              </p>
            </div>

            {/* Contact Info */}
            <div className={style.box}>
              <h4>Contact Info</h4>
              <div className={style.contactSection}>
                <div className={style.callSection}>
                  <FaPhoneAlt /> <a href="tel:+923213110100">+0321 3110100</a>
                </div>
                <div className={style.callSection}>
                  <FaWhatsapp /> <a href="https://wa.me/92228254984" target="_blank">+92228254984</a>
                </div>
                <div className={style.callSection}>
                  <FaEnvelope /> <a href="mailto:almuallimtravels@gmail.com">almuallimtravels@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Part */}
        <div className={style.bottomTwo}>
          <p>Copyright Ⓒ 2025 ABC Travel. All Rights Reserved By ABC</p>
          <div className={style.social}>
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
