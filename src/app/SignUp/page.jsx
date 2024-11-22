
"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";

const Page = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
  
    const newUser = { name, email, password };
  
    try {
      const res = await fetch('/SignUp/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Server error:', errorText);
        setError('Failed to register. Please try again.');
        return;
      }
  
      const data = await res.json();
      setSuccess('Registration successful!');
      console.log(data);
  
      // Reset form inputs on success
      e.target.name.value = '';
      e.target.email.value = '';
      e.target.password.value = '';
  
      // Clear the success message after a few seconds
      setTimeout(() => setSuccess(null), 3000);
  
    } catch (err) {
      console.error('Error:', err.message);
      setError('Something went wrong.');
    }
  };
  
  

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-[#1c1c1c] via-[#3a3a3a] to-[#5e5e5e]">
      <div className="relative p-0.5 rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        <div
          className="absolute md:h-[150%] inset-0 rounded-lg animate-spin-slow"
          style={{
            background: "conic-gradient(from 0deg, #1c1c1c 0%, #f2dbc6 25%, transparent 25%)",
          }}
        ></div>

        <div className="relative bg-black p-6 rounded-lg w-full max-w-md mx-auto">
          <h2 className="text-center text-white text-2xl mb-6 font-semibold">Register</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full p-4 rounded-md text-black bg-white focus:ring-[#c2956b] focus:border-[#c2956b] transition-all duration-200"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full p-4 rounded-md text-black bg-white focus:ring-[#c2956b] focus:border-[#c2956b] transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-white mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full p-4 rounded-md text-black bg-white focus:ring-[#c2956b] focus:border-[#c2956b] transition-all duration-200"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="w-full bg-[#c2956b] hover:bg-[#a5814f] text-white p-3 rounded-md font-semibold transition-colors duration-200"
              >
                Register
              </button>
            </div>
          </form>

          <div className="mt-6 text-center space-y-4">
            <button className="w-full flex items-center justify-center bg-gradient-to-r from-[#f1d350] to-[#DB4437] text-white p-3 rounded-md font-semibold transition-all">
              <FaGoogle className="mr-2 text-lg" />
              Sign in with Google
            </button>

            <div className="text-sm text-center">
              <Link href="/LogIn" className="text-[#c2956b] hover:underline">
                Have an account? Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

