"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import style from "./header.module.scss";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleHamburgerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleCloseClick = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDestinationClick = async () => {
    setIsOpen(false);

    if (pathname !== "/") {
      await router.push("/?scroll=destinations");
    } else {
      const section = document.querySelector(".destination-section");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const scrollTarget = params.get("scroll");

    if (scrollTarget === "destinations") {
      const scrollToSection = () => {
        const section = document.querySelector(".destination-section");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      };

      const timeout = setTimeout(scrollToSection, 500);
      return () => clearTimeout(timeout);
    }
  }, [pathname]);

  return (
    <div className={`${style.main} ${scrolled ? style.scrolled : ""}`}>
      <nav className={style.navbar}>
        <div className={style.navbarLeft}>
          <Link href="/">
            <img src="/logos.png" alt="Logo" className={style.logo} />
          </Link>
        </div>

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

        <div className={style.hamburger} onClick={handleHamburgerClick}>
          ☰
        </div>
      </nav>

      {isOpen && <div className={style.backdrop} onClick={handleCloseClick}></div>}
    </div>
  );
};

export default Navbar;
