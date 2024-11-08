
'use client'
import React from 'react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-[#1c1c1c] via-[#3a3a3a] to-[#5e5e5e]" // Gradient background
    >
      <div className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Company Logo */}
        <h1 className="text-4xl font-bold text-white mb-6">
          <span className="text-[#c2956b]">Haven</span>Stay
        </h1>

        {/* Login Form */}
        <form>
          <h2 className="text-lg text-white mb-4">Login into your account</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-transparent text-white placeholder-gray-400 focus:border-[#c2956b] focus:ring-[#c2956b] focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white text-sm mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-transparent text-white placeholder-gray-400 focus:border-[#c2956b] focus:ring-[#c2956b] focus:outline-none"
                placeholder="Enter your password"
              />
              {/* Eye icon could go here for "Show Password" functionality */}
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-white text-sm">
              <input type="checkbox" className="mr-2" />
              Keep me logged in
            </label>
            <Link href="/forgot-password" className="text-[#c2956b] text-sm">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#c2956b] text-white font-semibold rounded-md hover:bg-opacity-90 focus:outline-none"
          >
            Log in
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-white mt-6">
          Don't have an account?{' '}
          <Link href="/SignUp" className="text-[#c2956b] font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
