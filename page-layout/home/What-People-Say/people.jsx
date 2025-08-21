"use client";
import React from "react";
import style from "./people.module.scss";
import Image from "next/image";

const PeopleSection = () => {
  return (
    <section>
      <div className={style.peopleSection}>
        <h3>What People Say</h3>
        <p className={style.subHeading}>
          Hear from travelers who trusted us with their spiritual and leisure
          journeys
        </p>

        <div className={style.boxes}>
          <div className={style.box}>
            <div className={style.topSection}>
              <p className={style.margin}>4.00</p>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
            </div>
            <p className={style.styleText}>
              Lorem Ipsum has been the industry's standard dummy text ever
              since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book. It has survived
              not only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged.
            </p>
            <div className={style.bottomSection}>
              <Image
                src="/review.png"
                alt="Stanley Dai"
                width={50}
                height={50}
              />
              <div className={style.ceo}>
                <h5>Stanley Dai</h5>
                <p className={style.small}>CEO At Apple</p>
              </div>
            </div>
          </div>

          <div className={style.box}>
            <div className={style.topSection}>
              <p className={style.margin}>4.00</p>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
            </div>
            <p className={style.styleText}>
              Lorem Ipsum has been the industry's standard dummy text ever
              since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book. It has survived
              not only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged.
            </p>
            <div className={style.bottomSection}>
              <Image
                src="/review1.png"
                alt="Stanley Dai"
                width={50}
                height={50}
              />
              <div className={style.ceo}>
                <h5>Stanley Dai</h5>
                <p className={style.small}>CEO At Apple</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PeopleSection;
