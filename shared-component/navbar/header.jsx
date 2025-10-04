"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import style from "./header.module.scss";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleHamburgerClick = () => setIsOpen((prev) => !prev);
  const handleCloseClick = () => setIsOpen(false);

  // ✅ Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // ✅ Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Scroll to destinations section (manual click)
  const handleDestinationClick = async () => {
    setIsOpen(false);

    if (pathname !== "/") {
      // Go to home with scroll query
      await router.push("/?scroll=destinations");
    } else {
      // Already on home page, scroll immediately
      const section = document.querySelector(".destination-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // ✅ Auto-scroll when query param is ?scroll=destinations
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const scrollTarget = params.get("scroll");

    if (scrollTarget === "destinations") {
      const scrollToSection = () => {
        const section = document.querySelector(".destination-section");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      };

      // Wait for home page content to load fully
      const timeout = setTimeout(scrollToSection, 500);

      return () => clearTimeout(timeout);
    }
  }, [pathname]);

  return (
    <div className={`${style.main} ${scrolled ? style.scrolled : ""}`}>
      <nav className={style.navbar}>
        {/* Logo */}
        <div className={style.navbarLeft}>
          <Link href="/">
            <img src="/logo.png" alt="Logo" className={style.logo} />
          </Link>
        </div>

        {/* Navigation Links */}
        <div
          ref={drawerRef}
          className={`${style.navbarLinks} ${isOpen ? style.active : ""}`}
        >
          {isOpen && (
            <div className={style.closeIcon} onClick={handleCloseClick}>
              <FaTimes color="white" size={30} />
            </div>
          )}

          <Link href="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <button onClick={handleDestinationClick} className={style.linkButton}>
            Destinations
          </button>
          <Link href="/about" onClick={() => setIsOpen(false)}>
            About Us
          </Link>
          <Link href="/knowledge" onClick={() => setIsOpen(false)}>
            Knowledge
          </Link>
        </div>

        {/* Hamburger Menu */}
        <div className={style.hamburger} onClick={handleHamburgerClick}>
          ☰
        </div>
      </nav>

      {/* Backdrop */}
      {isOpen && (
        <div className={style.backdrop} onClick={handleCloseClick}></div>
      )}
    </div>
  );
};

export default Navbar;
