"use client";

import React from "react";

const HeaderSection: React.FC = () => {
  return (
    <section className="bg-[#0b1b3a] py-16 px-4 sm:px-8 lg:px-16 text-white text-center mt-20">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">
        About Al Muallim Travels
      </h1>
      <p className="max-w-4xl mx-auto text-base sm:text-lg leading-relaxed opacity-90">
        We are dedicated to making every Hajj and Umrah journey a seamless,
        spiritual, and stress-free experience. With years of trusted service and
        a commitment to excellence, our team takes care of every detail—from
        travel arrangements to personalized guidance so that you can focus
        entirely on your faith. Our mission is to provide comfort, reliability,
        and peace of mind at every step of your sacred journey.
      </p>
    </section>
  );
};

export default HeaderSection;
