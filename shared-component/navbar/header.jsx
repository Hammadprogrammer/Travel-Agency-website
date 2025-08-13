"use client"
import React, { useState, useEffect, useRef } from "react";
import style from "./header.module.scss";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className={style.navbar}>
      <div className={style.navbarLeft}>
        <img src="/logo.png" alt="Logo"  className={style.logo}/>
      </div>

      {/* Drawer Menu */}
      <div
        ref={menuRef}
        className={`${style.navbarLinks} ${isOpen ? style.active : ""}`}
      >
        {/* Close Icon inside drawer */}
        <div className={style.closeIcon} onClick={() => setIsOpen(false)}>
          ✖
        </div>

        <a href="#" onClick={() => setIsOpen(false)}>Home</a>
        <a href="#" onClick={() => setIsOpen(false)}>Destinations</a>
        <a href="#" onClick={() => setIsOpen(false)}>Selection</a>
        <a href="#" onClick={() => setIsOpen(false)}>About Us</a>
        <a href="#" onClick={() => setIsOpen(false)}>Log In</a>
      </div>

      {/* Hamburger Icon */}
      <div
        className={style.hamburger}
        onClick={() => setIsOpen(true)}
      >
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
