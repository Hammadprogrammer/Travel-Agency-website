"use client";
import React, { useState } from "react";
import style from "./header.module.scss";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleHamburgerClick = () => {
    setIsOpen(prev => !prev);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  return (
    
    <nav className={style.navbar}>
      <div className={style.navbarLeft}>
        <img src="/logo.png" alt="Logo" className={style.logo} />
      </div>

      <div className={`${style.navbarLinks} ${isOpen ? style.active : ""}`}>
        {isOpen && (
          <div className={style.closeIcon} onClick={handleCloseClick}>
            ✖
          </div>
        )}

        <a href="#">Home</a>
        <a href="#">Destinations</a>
        <a href="#">Selection</a>
        <a href="#">About Us</a>
        <a href="#">Log In</a>
      </div>

      <div className={style.hamburger} onClick={handleHamburgerClick}>
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
