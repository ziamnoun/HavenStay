'use client'

import React, { useState } from 'react';
import Link from 'next/link';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-gray-800 shadow-lg rounded-lg p-8">
        {/* Header Section */}
        <h1 className="text-4xl font-bold text-center text-[#c2956b] mb-6">Contact Us</h1>
        <p className="text-lg text-center text-gray-300 mb-6">
          We would love to hear from you! Please fill out the form below, and we’ll get back to you shortly.
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg text-gray-300">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 mt-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#c2956b]"
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-lg text-gray-300">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#c2956b]"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-lg text-gray-300">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 mt-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#c2956b]"
              placeholder="Enter your message"
              rows="5"
              required
            ></textarea>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-[#c2956b] text-white px-6 py-3 rounded-md shadow-md hover:bg-[#9f7f55] transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-gray-300">Or reach us through:</p>
          <Link href="mailto:contact@havenstay.com">
            <button className="bg-[#c2956b] text-white px-6 py-3 mt-4 rounded-md shadow-md hover:bg-[#9f7f55] transition duration-300">
              Email Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
