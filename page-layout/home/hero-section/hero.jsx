import React from "react";
import style from "./hero.module.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';


const Hero = () => {
  return (
    <header className={style.heroImage}>
      <div className={style.headerContent}>
        <div className={style.heroTextMain}>
        <div className={style.heroText}>
          <h1>From Intention to Completion We’re with You</h1>
          <p>
            Trusted Hajj & Umrah Packages Designed for a Peaceful Pilgrimage.
            Let Al Mualim Travels handle every detail, so you can focus on your
            faith.
          </p>
        </div>
        <div className={style.heroTextTwo}>
          <h1>ارادے سے تکمیل تک ہم آپ کے ساتھ ہیں</h1>
          <p>
            پُر اعتماد حج و عمرہ پیکجز جو آپ کے سفر کو پُرسکون بنائیں۔
            ہر تفصیل کا خیال رکھے گا "المُعلّم ٹریولز"، تاکہ آپ اپنی عبادت پر توجہ دے سکیں۔
          </p>

        </div>
        
          </div>

        <div className={style.btn}>
          <button className={style.btn1}>EXPLORE PACKAGES</button>
          <button className={style.btn2}>BOOK YOUR JOURNEY</button>
        </div>
      </div>


      <div className={style.socialIcons}>
        <i className="fab fa-facebook-f" ></i>
        <i className="fab fa-instagram" ></i>
        <i className="fab fa-twitter" ></i>

      </div>
    </header>
  );
};

export default Hero;