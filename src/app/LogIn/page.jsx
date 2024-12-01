
'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa'; 
import {signIn, useSession} from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from "next/navigation";


const Page = () => {
  
  const router = useRouter();
  const session = useSession();
  const searchParams = useSearchParams();
  const path = searchParams.get("redirect");

  console.log(session)
  

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const email = e.target.email.value;
  //   const password = e.target.password.value;
  //   const res=signIn('Credentials',{
  //     email,
  //     password,
  //     redirect: true,
  //     callbackUrl: path ? path : "/",

  //   })
   
  // };
  const handleSubmit =async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    signIn('credentials', {
      email,
      password,
      redirect: false, // Make sure to not redirect automatically for debugging purposes
    }).then((response) => {
      if (response.error) {
        console.error('Login failed:', response.error); // Log any error
      } else {
        console.log('Login successful');
      
        // Perform any post-login actions
      }
    });
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

        {/* Login form container */}
        <div className="relative bg-black p-6 rounded-lg w-full max-w-md mx-auto">
          <h2 className="text-center text-white text-2xl mb-6 font-semibold">Welcome Back</h2>

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
                className="w-full bg-[#c2956b] hover:bg-[#a5814f] text-white p-3 rounded-md font-semibold transition-colors duration-200"
              >
                Log In
              </button>
            </div>
          </form>

          {/* Google Sign-In Button Section */}
          <div className="mt-6 text-center space-y-4">
            <button className="w-full flex items-center justify-center bg-gradient-to-r from-[#f1d350] to-[#DB4437] text-white p-3 rounded-md font-semibold transition-all">
              <FaGoogle className="mr-2 text-lg" />
              Log in with Google
            </button>

            <div className="text-sm text-center">
              <Link href="/SignUp" className="text-[#c2956b] hover:underline">
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

