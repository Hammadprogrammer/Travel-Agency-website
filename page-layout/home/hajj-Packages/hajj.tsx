"use client";
  import React, { useState, useEffect } from "react";
  import style from "./hajj-umrah.module.scss";
  import { Swiper, SwiperSlide } from "swiper/react";
  import { Autoplay } from "swiper/modules";
  import "swiper/css";
  
  interface HajjPackage {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    createdAt: string;
    isActive: boolean
  }
  
  export default function HajjPackages() {
    const [packages, setPackages] = useState<HajjPackage[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isMobile, setIsMobile] = useState<boolean>(false);
  
    useEffect(() => {
      
      // async function fetchPackages() {
      //   try {
      //     const res = await fetch("https://dashboard-rho-lake.vercel.app/api/hajj");
      //     if (!res.ok) throw new Error("Failed to fetch packages");
      //     const data: HajjPackage[] = await res.json();
      //     const categoryOrder = ["economic", "standard", "premium"];
      //     const sortedData = Array.isArray(data)
      //       ? data.sort(
      //           (a, b) =>
      //             categoryOrder.indexOf(a.category.toLowerCase()) -
      //             categoryOrder.indexOf(b.category.toLowerCase())
      //         )
      //       : [];
      
      //     console.log("Sorted Packages:", sortedData);
      
      //     setPackages(sortedData);
      //   } catch (err) {
      //     console.error("Error fetching packages:", err);
      //     setPackages([]);
      //   } finally {
      //     setLoading(false);
      //   }
      // }
      
      // fetchPackages();
      async function fetchPackages() {
        try {
          const res = await fetch("https://dashboard-rho-lake.vercel.app/api/hajj");
          if (!res.ok) throw new Error("Failed to fetch packages");
      
          const data: HajjPackage[] = await res.json();
      
          const categoryOrder = ["economic", "standard", "premium"];
      
          // 🔹 Pehle sirf active packages lo, phir sort karo
          const filteredAndSortedData = Array.isArray(data)
            ? data
                .filter(pkg => pkg.isActive) // sirf active packages
                .sort(
                  (a, b) =>
                    categoryOrder.indexOf(a.category.toLowerCase()) -
                    categoryOrder.indexOf(b.category.toLowerCase())
                )
            : [];
      
          console.log("Filtered & Sorted Packages:", filteredAndSortedData);
      
          setPackages(filteredAndSortedData);
        } catch (err) {
          console.error("Error fetching packages:", err);
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
  
    if (loading) return <p className="p-6 text-gray-500">Loading packages...</p>;
  
    if (packages.length === 0)
      return (
        <div className={style.packageContainer}>
          <h1 className="text-3xl font-bold mb-4 text-center text-black">
            Hajj Packages
          </h1>
          <p className="text-gray-500 text-center">No packages available.</p>
        </div>
      );
  
    return (
      <div className={style.packageContainer}>
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Hajj Packages
        </h1>
  
        {isMobile ? (
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView={1.2}
            loop={true}
          >
            {packages.map((pkg, index) => (
              <SwiperSlide key={pkg.id}>
                <div className={style.slide}>
                  <img
                    src={pkg.imageUrl}
                    alt={`Hajj Package ${index + 1}`}
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
          <div className={style.slider}>
            {packages.map((pkg, index) => (
              <div key={pkg.id} className={style.slide}>
                <img
                  src={pkg.imageUrl}
                  alt={`Hajj Package ${index + 1}`}
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
    );
  }
  
  