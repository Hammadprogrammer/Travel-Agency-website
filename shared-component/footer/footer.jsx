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
          {/* Logo + Text */}
          <div className={style.boxOne}>
            <Image src="/logo.png" alt="logo" width={120} height={60} />
            <p className={style.latoFamily}>
              At Al Muallim Travels in Pakistan, we specialize in seamless Hajj
              and Umrah packages, offering visa assistance, 4- and 5-star hotel
              bookings, and comfortable transport in Makkah and Madinah. Alongside
              our religious travel services, we provide customized domestic and
              international tours for families, individuals, and corporate
              clients. Trust us to handle every detail with care, making your
              spiritual and leisure journeys smooth and memorable.
            </p>
          </div>

          {/* Quick Links */}
          <div className={style.box}>
            <h4>Quick Links</h4>
            <ul className={style.qPad}>
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
          <div className={style.box}>
            <h4>Our Offices</h4>
            <p className={style.latoFamily}>
              <b>Address #1</b> <br />
              Lorem Ipsum has been the industry's standard dummy text ever
              since the 1500s,
            </p>
            <p className={style.latoFamily}>
              <b>Address #2</b> <br />
              Lorem Ipsum has been the industry's standard dummy text ever
              since the 1500s,
            </p>
          </div>

          {/* Contact Info */}
          <div className={style.box}>
            <h4>Contact Info</h4>
            <div className={style.contactSection}>
              <div className={style.callSection}>
                <FaPhoneAlt style={{ color: "white", fontSize: "22px" }} />
                <div className={style.content}>
                  <p className={style.helpCare}>Drop line:</p>
                  <a href="tel:+923333032648">+92-333-3032648</a>
                </div>
              </div>

              <div className={style.callSection}>
                <FaWhatsapp style={{ color: "white", fontSize: "22px" }} />
                <div className={style.content}>
                  <p className={style.helpCare}>WhatsApp:</p>
                  <a href="https://wa.me/923128784703" target="_blank">+92-312-8784703</a>
                </div>
              </div>

              <div className={style.callSection}>
                <FaEnvelope style={{ color: "white", fontSize: "22px" }} />
                <div className={style.content}>
                  <p className={style.helpCare}>Email:</p>
                  <a href="mailto:saadkhalid7ctech@gmail.com">
                    saadkhalid7ctech@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Part */}
        <div className={style.bottomTwo}>
          <div className={style.section}></div>
          <div className={style.sectionMid}>
            Copyright Ⓒ 2025 ABC Travel. All Rights Reserved By ABC
          </div>
          <div className={style.section}>
            <FaFacebookF style={{ color: "white", fontSize: "20px", marginRight: "12px" }} />
            <FaInstagram style={{ color: "white", fontSize: "20px", marginRight: "12px" }} />
            <FaTwitter style={{ color: "white", fontSize: "20px" }} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
