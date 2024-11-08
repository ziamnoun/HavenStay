'use client'
import Link from 'next/link';
import React, { useState } from 'react';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign in logic here, like sending a request to an API
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-[#1c1c1c] via-[#3a3a3a] to-[#5e5e5e]">
      <div className="relative p-0.5 rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        {/* Spinning conic gradient from the center */}
        <div
          className="absolute md:h-[150%] inset-0 rounded-lg animate-spin-slow"
          style={{
            background: "conic-gradient(from 0deg, #1c1c1c 0%, #f2dbc6 25%, transparent 25%)",
          }}
        ></div>

        {/* Sign In form container with almost equal size to the parent */}
        <div className="relative bg-black p-6 rounded-lg w-full max-w-md mx-auto">
          <h2 className="text-center text-white text-2xl mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-white mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 rounded-md text-black"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-white mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 rounded-md text-black"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="w-full bg-[#c2956b] hover:bg-[#a5814f] text-white p-3 rounded-md"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <Link href="/signup" className="text-[#c2956b] hover:underline">
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
