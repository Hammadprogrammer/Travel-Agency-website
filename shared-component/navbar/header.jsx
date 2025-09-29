"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import style from "./header.module.scss";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef(null);

  const handleHamburgerClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  // ✅ Close drawer on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // ✅ Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${style.main} ${scrolled ? style.scrolled : ""}`}>
      <nav className={style.navbar}>
        {/* Left - Logo */}
        <div className={style.navbarLeft}>
          <Link href="/">
            <img src="/logo.png" alt="Logo" className={style.logo} />
          </Link>
        </div>

        {/* Drawer Menu */}
        <div
          ref={drawerRef}
          className={`${style.navbarLinks} ${isOpen ? style.active : ""}`}
        >
          {isOpen && (
            <div className={style.closeIcon} onClick={handleCloseClick}>
              <FaTimes color="white" size={30} />
            </div>
          )}

          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/#destinations" onClick={() => setIsOpen(false)}>Destinations</Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>About Us</Link>
          <Link href="/knowledge" onClick={() => setIsOpen(false)}>Knowledge</Link>
        </div>

        {/* Hamburger Icon */}
        <div className={style.hamburger} onClick={handleHamburgerClick}>
          ☰
        </div>
      </nav>

      {/* ✅ Backdrop overlay */}
      {isOpen && <div className={style.backdrop} onClick={handleCloseClick}></div>}
    </div>
  );
};

export default Navbar;
