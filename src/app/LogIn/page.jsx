
'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { signIn, useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from "next/navigation";
import SocialSignin from '@/Components/SocialSignin';

const Page = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = searchParams.get("redirect");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setError(null); // Clear previous error
    setSuccess(null); // Clear previous success

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (response?.error) {
        console.error('Login failed:', response.error);
        setError('Login failed. Please check your credentials.');
      } else {
        setSuccess('Login successful!');
        console.log('Login successful:', response);
        setTimeout(() => {
          router.push(path ? path : '/');
        }, 2000); // Redirect after a delay
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-[#1c1c1c] via-[#3a3a3a] to-[#5e5e5e]">
      <div className="relative p-0.5 rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        {/* Spinning conic gradient */}
        <div
          className="absolute md:h-[150%] inset-0 rounded-lg animate-spin-slow"
          style={{
            background: "conic-gradient(from 0deg, #1c1c1c 0%, #f2dbc6 25%, transparent 25%)",
          }}
        ></div>

        {/* Login form container */}
        <div className="relative bg-black p-6 rounded-lg w-full max-w-md mx-auto">
          <h2 className="text-center text-white text-2xl mb-6 font-semibold">Welcome Back</h2>

          {/* Notification messages */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
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
                disabled={isLoading}
                className={`w-full p-3 rounded-md font-semibold transition-colors duration-200 ${
                  isLoading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-[#c2956b] hover:bg-[#a5814f] text-white"
                }`}
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>
            </div>
          </form>

          {/* Google Sign-In Button Section */}
          <div className="mt-6 text-center space-y-4">
           <SocialSignin></SocialSignin>

            <div className="text-sm text-center">
              <Link href="/SignUp" className="text-[#c2956b] hover:underline">
              Don&apos;t have an account?  Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;