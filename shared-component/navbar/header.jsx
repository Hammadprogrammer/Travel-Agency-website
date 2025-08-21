"use client";
import React, { useState } from "react";
import style from "./header.module.scss";
import LoginForm from "../loginForm";
import SignupForm from "../signupForm";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleHamburgerClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  return (
    <>
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

          <button
            onClick={() => setShowLogin(true)}
            className={style.loginBtn}
          >
            Log In
          </button>
        </div>

        <div className={style.hamburger} onClick={handleHamburgerClick}>
          ☰
        </div>
      </nav>
      {showLogin && (
        <LoginForm 
          onClose={() => setShowLogin(false)} 
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }} 
        />
      )}
      {showSignup && (
        <SignupForm
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true); // 👈 login open karo
          }}
        />
      )}
    </>
  );
};

export default Navbar;
