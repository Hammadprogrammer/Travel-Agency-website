"use client";
import React, { useState } from "react";
import style from "./header.module.scss";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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

      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
    </>
  );
};

// ---- Login Form Component ----
function LoginForm({ onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className={style.overlay}>
      <div className={style.loginBox}>
        <button onClick={onClose} className={style.closeBtn}>
          ✖
        </button>

        <h2 className={style.title}>Welcome Back 👋</h2>
        <p className={style.subtitle}>Please log in to continue</p>

        <form className={style.form} onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className={style.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className={style.input}
          />
          <button type="submit" className={style.loginBtn}>
            Login
          </button>
        </form>

        <p className={style.registerText}>
          Don’t have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Navbar;
