"use client";
import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import style from "./header.module.scss";
import LoginForm from "../loginForm";
import SignupForm from "../signupForm";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    <>
      {/* Full width wrapper */}
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
            <Link href="/selection">Selection</Link>
            <Link href="/about-us">About Us</Link>

            {!isLoggedIn && (
              <button
                onClick={() => setShowLogin(true)}
                className={style.loginBtn}
              >
                Log In
              </button>
            )}
          </div>

          <div className={style.hamburger} onClick={handleHamburgerClick}>
            ☰
          </div>
        </nav>
      </div>

      {showLogin && (
        <LoginForm
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
          onLoginSuccess={() => {
            setIsLoggedIn(true);
            setShowLogin(false);
          }}
        />
      )}

      {showSignup && (
        <SignupForm
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
          onSignupSuccess={() => {
            setIsLoggedIn(true);
            setShowSignup(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar;
