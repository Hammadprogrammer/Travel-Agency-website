"use client";
import React from "react";
import style from "./footer.module.scss";
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.lastSection}>
        {/* Top Part: Logo, Links, Address, Contact */}
        <div className={style.bottomOne}>
          
          {/* Logo & Description */}
          <div className={`${style.box} ${style.logoBox}`}>
            <Image src="/logo.png" alt="logo" width={80} height={40} />
            <p className={style.logoDescription}>
              At Al Muallim Travels in Pakistan, we specialize in seamless Hajj
              and Umrah packages, offering visa assistance, 4- and 5-star hotel
              bookings, and comfortable transport in Makkah and Madinah. Alongside
              our religious travel services, we provide customized domestic and
              international tours for families, individuals, and corporate clients.
            </p>
          </div>

          {/* Quick Links, Offices, Contact */}
          <div className={style.bottomGroup}>
            
            {/* Quick Links */}
            <div className={style.box}>
              <h4 className={style.footerHeading}>Quick Links</h4>
              <ul>
                <li><Link className={style.footerLink} href="/about">About Us</Link></li>
                <li><Link className={style.footerLink} href="#umrah">Umrah Packages</Link></li>
                <li><Link className={style.footerLink} href="#international">International Tour</Link></li>
                <li><Link className={style.footerLink} href="/contact">Contact Us</Link></li>
              </ul>
            </div>

            {/* Offices */}
            <div className={`${style.box} ${style.officesBox}`}>
              <h4 className={style.footerHeading}>Office Address</h4>
              <div className={style.officeContentWrapper}>
                <FaMapMarkerAlt className={style.officeIcon} />
                <p className={style.officeContent}>
                  Office # 58, 4th Floor, RJ Mall, Main Rashid Minhas Road, Karachi., Karachi, Pakistan
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className={style.box}>
              <h4 className={style.footerHeading}>Contact Info</h4>
              <div className={style.contactSection}>
                <div className={style.callSection}>
                  <FaPhoneAlt className={style.icon} /> <a className={style.footerLink} href="tel:+03213110100">0321 3110100</a>
                </div>
                <div className={style.callSection}>
                  <FaWhatsapp className={style.icon}/> <a className={style.footerLink} href="https://wa.me/92228254984" target="_blank">+92228254984</a>
                </div>
                <div className={style.callSection}>
                  <FaEnvelope className={style.icon}/> <a className={style.footerLink} href="mailto:almuallimtravels@gmail.com">almuallimtravels@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Part: Copyright & Social */}
        <div className={style.bottomTwo}>
        <p style={{ textAlign: "center" }}>
          Copyright Ⓒ 2025 ABC Travel. All Rights Reserved By ABC
        </p>
          <div className={style.social}>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;