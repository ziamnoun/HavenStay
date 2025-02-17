'use client'

import React from 'react';
import Link from 'next/link';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-gray-800 shadow-lg rounded-lg p-8">
        {/* Header Section */}
        <h1 className="text-4xl font-bold text-center text-[#c2956b] mb-6">Welcome to Haven Stay</h1>
        <p className="text-lg text-center text-gray-300 mb-6">
          Your perfect getaway destination, offering luxurious and serene villas for your dream vacation.
        </p>
        
        {/* Why Choose Us Section */}
        <h2 className="text-2xl font-semibold text-[#c2956b] mb-4">Why Choose Haven Stay?</h2>
        <ul className="list-disc list-inside text-gray-300 mb-6">
          <li>🌿 Luxurious & Comfortable Villas</li>
          <li>🏝️ Stunning Beachfront Locations</li>
          <li>🌟 24/7 Customer Support</li>
          <li>🍽️ Exclusive Dining & Spa Facilities</li>
        </ul>
        
        {/* Call to Action */}
        <div className="text-center mt-8">
          <Link href="/Contact">
            <button className="bg-[#c2956b] text-white px-6 py-3 rounded-md shadow-md hover:bg-[#9f7f55] transition duration-300">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
