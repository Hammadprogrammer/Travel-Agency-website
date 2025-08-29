"use client";
import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import style from "./header.module.scss";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleHamburgerClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${style.main} ${scrolled ? style.scrolled : ""}`}>
      <nav className={style.navbar}>
        <div className={style.navbarLeft}>
          <img src="/logo.png" alt="Logo" className={style.logo} />
        </div>

        <div className={`${style.navbarLinks} ${isOpen ? style.active : ""}`}>
          {isOpen && (
            <div className={style.closeIcon} onClick={handleCloseClick}>
              <FaTimes color="white" size={30} />
            </div>
          )}

          <Link href="/">Home</Link>
          <Link href="/destinations">Destinations</Link>
          <Link href="/about">About Us</Link>
          <Link href="/knowledge">Knowledge</Link>
        </div>

        <div className={style.hamburger} onClick={handleHamburgerClick}>
          ☰
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
    