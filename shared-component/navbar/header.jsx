// "use client";
// import React, { useState } from "react";
// import style from "./header.module.scss";
// import LoginForm from "../loginForm";
// import SignupForm from "../signupForm";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);
//   const [showSignup, setShowSignup] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleHamburgerClick = () => {
//     setIsOpen((prev) => !prev);
//   };

//   const handleCloseClick = () => {
//     setIsOpen(false);
//   };

//   return (
//     <>
//       <nav className={style.navbar}>
//         <div className={style.navbarLeft}>
//           <img src="/logo.png" alt="Logo" className={style.logo} />
//         </div>

//         <div className={`${style.navbarLinks} ${isOpen ? style.active : ""}`}>
//           {isOpen && (
//             <div className={style.closeIcon} onClick={handleCloseClick}>
//               ✖
//             </div>
//           )}

//           <a href="#">Home</a>
//           <a href="#">Destinations</a>
//           <a href="#">Selection</a>
//           <a href="#">About Us</a>

//           {!isLoggedIn && ( 
//             <button
//               onClick={() => setShowLogin(true)}
//               className={style.loginBtn}
//             >
//               Log In
//             </button>
//           )}
//         </div>

//         <div className={style.hamburger} onClick={handleHamburgerClick}>
//           ☰
//         </div>
//       </nav>

//       {showLogin && (
//         <LoginForm
//           onClose={() => setShowLogin(false)}
//           onSwitchToSignup={() => {
//             setShowLogin(false);
//             setShowSignup(true);
//           }}
//           onLoginSuccess={() => {
//             setIsLoggedIn(true); 
//             setShowLogin(false);
//           }}
//         />
//       )}

//       {showSignup && (
//         <SignupForm
//           onClose={() => setShowSignup(false)}
//           onSwitchToLogin={() => {
//             setShowSignup(false);
//             setShowLogin(true);
//           }}
//           onSignupSuccess={() => {
//             setIsLoggedIn(true);
//             setShowSignup(false);
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default Navbar;
"use client";
import React, { useState, useEffect } from "react";
import style from "./header.module.scss";
import LoginForm from "../loginForm";
import SignupForm from "../signupForm";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ new state

  // ✅ Check localStorage on first load
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
    setLoading(false); // ✅ done checking
  }, []);

  const handleHamburgerClick = () => setIsOpen((prev) => !prev);
  const handleCloseClick = () => setIsOpen(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  if (loading) {
    return null;
  }

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

          {!isLoggedIn ? (
            <button
              onClick={() => setShowLogin(true)}
              className={style.loginBtn}
            >
              Log In
            </button>
          ) : (
            <button onClick={handleLogout} className={style.logoutBtn}>
              Log Out
            </button>
          )}
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
          onLoginSuccess={() => {
            setIsLoggedIn(true);
            localStorage.setItem("isLoggedIn", "true");
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
            localStorage.setItem("isLoggedIn", "true");
            setShowSignup(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar;