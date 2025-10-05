"use client";

import React from "react";

interface ValueCardProps {
  title: string;
  content: string;
  color: string; // Example: "blue", "red", "green"
}

// ✅ Safe Tailwind dynamic color handling
const ValueCard: React.FC<ValueCardProps> = ({ title, content, color }) => {
  // Dynamically build border color class with fallback
  const borderClass = `border-t-4 border-${color}-500`;

  return (
    <div
      className={`p-8 rounded-lg text-white h-full shadow-lg bg-[#0b1b3a] ${borderClass}`}
    >
      <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">
        {title}
      </h3>
      <p className="text-sm opacity-90 leading-relaxed">{content}</p>
    </div>
  );
};

const CoreValuesSection: React.FC = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-[#0b1b3a] text-center mb-12">
        Our Core Values
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1: Mission */}
        <ValueCard
          title="Mission"
          content="To provide safe, comfortable, and spiritually enriching Hajj & Umrah services for every pilgrim, with trusted services and guidance that ensure peace of mind throughout the journey."
          color="blue"
        />

        {/* Card 2: Vision */}
        <ValueCard
          title="Vision"
          content="To be the most trusted global travel partner for sacred journeys, providing reliable, dignified, and spiritually fulfilling experiences. With honesty, integrity, and care, we strive to make every journey meaningful."
          color="blue"
        />

        {/* Card 3: Values */}
        <ValueCard
          title="Values"
          content="We believe in transparency, trust, and customer satisfaction. We operate with ethics. With honesty and care at the heart of our work, we strive to create a seamless and compassionate experience for every pilgrim."
          color="blue"
        />
      </div>
    </section>
  );
};

export default CoreValuesSection;
