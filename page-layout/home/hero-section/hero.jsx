import React from "react";
import style from "./hero.module.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';


const Hero = () => {
  return (
    <header className={style.heroImage}>
      <div className={style.headerContent}>
        <h1>From Intention to Completion We’re with You</h1>
        <p>
          Trusted Hajj & Umrah Packages Designed for a Peaceful Pilgrimage.
          Let Al Mualim Travels handle every detail, so you can focus on your
          faith.
        </p>
        <div className={style.btn}>
        <button className={style.btn1}>EXPLORE PACKAGES</button>
        <button className={style.btn1}>BOOK YOUR JOURNEY</button>
        </div>
      </div>

     <div className={style.socialIcons}>
<i className="fab fa-facebook-f" style={{ color: "black" }}></i>
<i className="fab fa-instagram" style={{ color: "black" }}></i>
<i className="fab fa-twitter" style={{ color: "black" }}></i>

</div>
    </header>
  );
};

export default Hero;
