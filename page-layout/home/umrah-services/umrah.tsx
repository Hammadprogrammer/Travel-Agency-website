"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import style from "./umrah.module.scss";
import { BeatLoader } from "react-spinners";

interface ServiceImage {
  id: number;
  url: string;
  publicId: string;
  serviceId: number;
}

interface UmrahService {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
  heroImage?: string | null;
  serviceImages: ServiceImage[];
}

export default function UmrahServices() {
  const [hero, setHero] = useState<UmrahService | null>(null);
  const [cards, setCards] = useState<UmrahService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(
          "https://dashboard-rho-lake.vercel.app/api/umrah-service"
        );
        if (!res.ok) throw new Error("Failed to fetch services");

        const data: UmrahService[] = await res.json();

        if (Array.isArray(data)) {
          const active = data.filter((srv) => srv.isActive);

          // hero service
          const heroData = active.find((srv) => srv.heroImage);
          setHero(heroData || null);

          // cards
          const cardData = active.filter(
            (srv) => srv.serviceImages?.length > 0
          );
          setCards(cardData);
        }
      } catch (err) {
        console.error("Error fetching umrah services:", err);
        setHero(null);
        setCards([]);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <BeatLoader color="#4cafef" size={18} margin={3} />
      </div>
    );
  }

  if (!hero) {
    return (
      <div className={style.servicesSection}>
        <h3 className="text-2xl font-bold mb-6 text-center text-black">
          Umrah Services
        </h3>
        <p className="text-gray-500 text-center">
          No services available at the moment.
        </p>
      </div>
    );
  }

  return (
    <section
      className={style.servicesSection}
      style={{
        backgroundImage: `
          linear-gradient(rgba(62,88,215,0.6), rgba(0,0,0,0.6)),
          url(${hero.heroImage})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h3>{hero.title}</h3>
      <p className={style.subHeading}>{hero.description}</p>

      <div className={style.cardsGrid}>
        {cards.map((service) => (
          <div key={service.id} className={style.contentBox}>
            <div className={style.logos}>
              <Image
                src={service.serviceImages[0].url}
                width={56}
                height={56}
                alt={service.title}
              />
            </div>
            <div className={style.boxContent}>
              <h5>{service.title}</h5>
              <p className={style.setting}>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
