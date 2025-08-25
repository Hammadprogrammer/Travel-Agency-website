"use client";
import React from "react";
import style from "./footer.module.scss";
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.lastSection}>
        {/* Top Part */}
        <div className={style.bottomOne}>
          {/* Logo */}
          <div className={`${style.box} ${style.logoBox}`}>
            <Image src="/logo.png" alt="logo" width={120} height={60} />
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
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#">About us</a></li>
                <li><a href="#">Umrah Packages</a></li>
                <li><a href="#">International Tour</a></li>
                <li><a href="#">Pakistan Tour</a></li>
                <li><a href="#">Visa Consultancy</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Customers Feedback</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Offices */}
            <div className={`${style.box} ${style.officesBox}`}>
              <h4>Our Offices</h4>
              <p>
                <b>Address #1</b> <br />
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              </p>
              <p>
                <b>Address #2</b> <br />
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              </p>
            </div>

            {/* Contact Info */}
            <div className={style.box}>
              <h4>Contact Info</h4>
              <div className={style.contactSection}>
                <div className={style.callSection}>
                  <FaPhoneAlt /> <a href="tel:+92228254984">+92228254984</a>
                </div>
                <div className={style.callSection}>
                  <FaWhatsapp /> <a href="https://wa.me/92228254984" target="_blank">+92228254984</a>
                </div>
                <div className={style.callSection}>
                  <FaEnvelope /> <a href="mailto:almullaim@gmail.com">almullaim@gmail.com</a>
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
