"use client";

import React from "react";

const WhoWeAreSection: React.FC = () => {
  // const kaabaImageUrl ="https://akcdn.detik.net.id/visual/2024/09/11/ilustrasi-mekkah_43.jpeg?w=720&q=90";
  const kaabaImageUrl ="/about.jpeg";


  return (
    <section className="py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* ✅ Image Section */}
        <div className="md:w-1/2 order-2 md:order-1">
          <img
            src={kaabaImageUrl}
            alt="The Holy Kaaba in Makkah"
            className="w-full h-auto object-cover rounded-lg shadow-xl"
            style={{ minHeight: "300px" }}
          />
        </div>

        {/* ✅ Text Section */}
        <div className="md:w-1/2 order-1 md:order-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0b1b3a] mb-4">
            Who We Are
          </h2>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Al Muallim Travels is a trusted name in Hajj and Umrah services,
            proudly guiding thousands of pilgrims on their sacred journeys for
            over a decade. We believe that every pilgrimage should be a
            meaningful and worry-free experience, which is why our team ensures
            complete support – from flights and accommodations to on-ground
            assistance.
          </p>
          <p className="mb-8 text-gray-700 leading-relaxed">
            With sincerity, professionalism, and care, we are committed to making
            your spiritual journey as peaceful and memorable as possible.
          </p>
          <button className="bg-[#0b1b3a] hover:bg-[#1f4077] text-white font-semibold py-3 px-6 rounded transition duration-300">
            Explore Packages
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
