// "use client";
// import React, { useState, useEffect } from "react";
// import style from "./umrah.jsx.module.scss";
// import Image from "next/image";

// const UmrahPakage = () => {
//   const images = [
//     "/umrah.png",
//     "/umrah.png",
//     "/umrah.png",

//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   useEffect(() => {
//     const interval = setInterval(nextSlide, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className={style.whyChooseUsSection}>
//       <div className={style.container}>
//         <h2 className={style.header}>
//          Umrah Packages
//         </h2>

//         <div className={style.desktopView}>
//           <div className={style.imageGrid}>
//             {images.map((src, index) => (
//               <Image
//                 key={index}
//                 src={src}
//                 alt={`Slide ${index + 1}`}
//                 width={400}
//                 height={300}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Mobile Slider */}
//         <div className={style.mobileView}>
//           <div className={style.slider}>
//             <div className={style.slide}>
//               <Image
//                 src={images[currentIndex]}
//                 alt={`Slide ${currentIndex + 1}`}
//                 width={400}
//                 height={300}
//               />
//             </div>
//           </div>

//           {/* Dots Navigation */}
//           <div className={style.sliderIndicators}>
//             {images.map((_, index) => (
//               <div
//                 key={index}
//                 className={`${style.indicator} ${
//                   index === currentIndex ? style.active : ""
//                 }`}
//                 onClick={() => setCurrentIndex(index)}
//               ></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default UmrahPakage;
"use client";
import React, { useState, useEffect } from "react";
import style from "./umrah.jsx.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { BeatLoader } from "react-spinners";

interface UmrahPackage {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  createdAt: string;
  isActive: boolean;
  category: string;
}

export default function UmrahPackages() {
  const [packages, setPackages] = useState<UmrahPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch(
          "https://dashboard-rho-lake.vercel.app/api/umrah"
        );
        if (!res.ok) throw new Error("Failed to fetch packages");

        const data: UmrahPackage[] = await res.json();

        const categoryOrder = ["economic", "standard", "premium"];

        const filteredAndSortedData = Array.isArray(data)
          ? data
              .filter((pkg) => pkg.isActive)
              .sort(
                (a, b) =>
                  categoryOrder.indexOf(a.category.toLowerCase()) -
                  categoryOrder.indexOf(b.category.toLowerCase())
              )
          : [];

        setPackages(filteredAndSortedData);
      } catch (err) {
        console.error("Error fetching Umrah packages:", err);
        setPackages([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <BeatLoader color="#4cafef" size={18} margin={3} />
      </div>
    );
  }

  if (packages.length === 0)
    return (
      <div className={style.container}>
        <h2 className="text-3xl font-bold mb-4 text-center text-black">
          Umrah Packages
        </h2>
        <p className="text-gray-500 text-center">No packages available.</p>
      </div>
    );

  return (
    <section className={style.whyChooseUsSection}>
      <div className={style.container}>
        <h2 className={style.header}>Umrah Packages</h2>

        {isMobile ? (
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView={1.2}
            loop={true}
          >
            {packages.map((pkg) => (
              <SwiperSlide key={pkg.id}>
                <div className={style.slide}>
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://via.placeholder.com/360x502?text=Image+Not+Found")
                    }
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={style.imageGrid}>
            {packages.map((pkg) => (
              <div key={pkg.id} className={style.slide}>
                <img
                  src={pkg.imageUrl}
                  alt={pkg.title}
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://via.placeholder.com/360x502?text=Image+Not+Found")
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
