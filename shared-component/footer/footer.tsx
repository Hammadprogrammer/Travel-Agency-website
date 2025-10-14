"use client";
import React, { useState } from "react";
import style from "./footer.module.scss";
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Popup from "@/shared-component/package-popup/popup";
import Link from "next/link";

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  const handleScroll = (id: string) => {
    if (pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <footer className={style.footer}>
      <div className={style.lastSection}>
        <div className={style.bottomOne}>
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

          <div className={style.bottomGroup}>
            <div className={style.box}>
              <h4 className={style.footerHeading}>Quick Links</h4>
              <ul>
                <li>
                  <button className={style.footerLink} onClick={() => router.push("/about")}>
                    About Us
                  </button>
                </li>
                <li>
                  <button className={style.footerLink} onClick={() => handleScroll("umrah")}>
                    Umrah Packages
                  </button>
                </li>
                <li>
                  <button className={style.footerLink} onClick={() => handleScroll("holiday")}>
                    International Tour
                  </button>
                </li>
                <li>
                  <button className={style.footerLink} onClick={() => setIsContactPopupOpen(true)}>
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            <div className={`${style.box} ${style.officesBox}`}>
              <h4 className={style.footerHeading}>Office Address</h4>
            <div className={style.officeContentWrapper}>
              <FaMapMarkerAlt className={style.officeIcon} />
              <a
                href="https://www.google.com/maps/place/RJ+Mall+Karachi/@24.9026015,67.1120654,17z/data=!3m1!4b1!4m6!3m5!1s0x3eb339b315dd62cd:0x4814990e74e37937!8m2!3d24.9025967!4d67.1146403!16s%2Fg%2F11j1mht25j?entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className={style.officeContent}
              >
                48-B, RJ Mall, Main Rashid Minhas Road, Karachi, Pakistan
              </a>
            </div>
            </div>

            <div className={style.box}>
              <h4 className={style.footerHeading}>Contact Info</h4>
              <div className={style.contactSection}>
                <div className={style.callSection}>
                  <FaPhoneAlt className={style.icon} /> 
                  <a className={style.footerLink} href="tel:03213110100">0321-3110100</a>
                </div>
                <div className={style.callSection}>
                  <FaWhatsapp className={style.icon}/> 
                  <a className={style.footerLink} href="https://wa.me/92228254984" target="_blank">+92 321-3110100</a>
                </div>
                <div className={style.callSection}>
                  <FaEnvelope className={style.icon} />
                  <a
                    className={style.footerLink}
                    href="mailto:almuallimtravels@gmail.com"
                  >
                    almuallimtravels@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.footerDivider}>
        <div className={style.bottomTwo}>
          {/* <img src="/7ctech.png" alt="" /> */}
          <Link href="https://www.7ctech.com/"><h1 style={{fontSize:"18px", fontWeight:"bolder"}}>Powered By 7CTECH</h1></Link>
          <p style={{ textAlign: "center", fontWeight:"bold" }}>
            Copyright Ⓒ 2025 Al-Muallim Travel. All Rights Reserved By Al-Muallim
          </p>
          <div className={style.social}>
            <a href="https://www.facebook.com/Almuallimtravels/"><FaFacebookF /></a>
            <a href="https://www.instagram.com/almuallimtravels/#"><FaInstagram /></a>
            <a href="https://www.youtube.com/@almuallimtravels"><FaYoutube /></a>
          </div>
        </div>
        </div>
      </div>

      {/* Contact Popup */}
      {isContactPopupOpen && <Popup onClose={() => setIsContactPopupOpen(false)} />}
    </footer>
  );
};

export default Footer;
