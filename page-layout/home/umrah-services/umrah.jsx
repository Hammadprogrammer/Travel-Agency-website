"use client";
import Image from "next/image";
import style from "./umrah.module.scss";

const services = [
  {
    img: "/visa.png",
    title: "Visa Services",
    desc: "Avail umrah visa with just a 3 step online process and get an approval in 48 hours",
  },
  {
    img: "/Plane.png",
    title: "Flights Reservations",
    desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  },
  {
    img: "/Booking.png",
    title: "Hotel Booking",
    desc: "Book luxury hotels at the best prices, as we are in collaboration with top hotels in Saudi Arabia",
  },
  {
    img: "/Transportation.png",
    title: "Transportation",
    desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  },
];

const UmrahServices = () => {
  return (
    <section className={style.servicesSection}>
      <h3>Umrah Services</h3>
      <p className={style.subHeading}>
        Our travel agency got 5 star ratings for umrah services. We offer
        competitive pricing with best customer support available 24/7.
      </p>

      <div className={style.cardsGrid}>
        {services.map((service, i) => (
          <div key={i} className={style.contentBox}>
            <div className={style.logos}>
              <Image src={service.img} width={56} height={56} alt={service.title} />
            </div>
            <div className={style.boxContent}>
              <h5>{service.title}</h5>
              <p className={style.setting}>{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UmrahServices;
