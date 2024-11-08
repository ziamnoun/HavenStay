
// 'use client'
// import React from 'react';
// import Link from 'next/link';

// export default function LoginPage() {
//   return (
//     <div
//       className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-[#1c1c1c] via-[#3a3a3a] to-[#5e5e5e]" // Gradient background
//     >
//       <div className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg w-full max-w-md">
//         {/* Company Logo */}
//         <h1 className="text-4xl font-bold text-white mb-6">
//           <span className="text-[#c2956b]">Haven</span>Stay
//         </h1>

//         {/* Login Form */}
//         <form>
//           <h2 className="text-lg text-white mb-4">Login into your account</h2>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-white text-sm mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md bg-transparent text-white placeholder-gray-400 focus:border-[#c2956b] focus:ring-[#c2956b] focus:outline-none"
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-white text-sm mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type="password"
//                 id="password"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md bg-transparent text-white placeholder-gray-400 focus:border-[#c2956b] focus:ring-[#c2956b] focus:outline-none"
//                 placeholder="Enter your password"
//               />
//               {/* Eye icon could go here for "Show Password" functionality */}
//             </div>
//           </div>
//           <div className="flex items-center justify-between mb-4">
//             <label className="flex items-center text-white text-sm">
//               <input type="checkbox" className="mr-2" />
//               Keep me logged in
//             </label>
//             <Link href="/forgot-password" className="text-[#c2956b] text-sm">
//               Forgot Password?
//             </Link>
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 bg-[#c2956b] text-white font-semibold rounded-md hover:bg-opacity-90 focus:outline-none"
//           >
//             Log in
//           </button>
//         </form>

//         {/* Register Link */}
//         <p className="text-center text-white mt-6">
//           Don't have an account?{' '}
//           <Link href="/SignUp" className="text-[#c2956b] font-semibold">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa'; // Importing Google icon

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here, like sending a request to an API
    console.log('Email:', email);
    console.log('Password:', password);
    if (profilePicture) {
      console.log('Profile Picture:', profilePicture.name);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

