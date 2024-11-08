// 'use client'
// import Link from 'next/link';
// import React, { useState } from 'react';

// const Page = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle sign in logic here, like sending a request to an API
//     console.log('Email:', email);
//     console.log('Password:', password);
//   };

//   return (
//     <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-[#1c1c1c] via-[#3a3a3a] to-[#5e5e5e]">
//       <div className="relative p-0.5 rounded-lg shadow-lg w-full max-w-md overflow-hidden">
//         {/* Spinning conic gradient from the center */}
//         <div
//           className="absolute md:h-[150%] inset-0 rounded-lg animate-spin-slow"
//           style={{
//             background: "conic-gradient(from 0deg, #1c1c1c 0%, #f2dbc6 25%, transparent 25%)",
//           }}
//         ></div>

//         {/* Sign In form container with almost equal size to the parent */}
//         <div className="relative bg-black p-6 rounded-lg w-full max-w-md mx-auto">
//           <h2 className="text-center text-white text-2xl mb-6">Sign In</h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-white mb-2">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full p-3 rounded-md text-black"
//                 placeholder="Enter your email"
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-white mb-2">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-full p-3 rounded-md text-black"
//                 placeholder="Enter your password"
//               />
//             </div>

//             <div className="flex justify-between items-center">
//               <button
//                 type="submit"
//                 className="w-full bg-[#c2956b] hover:bg-[#a5814f] text-white p-3 rounded-md"
//               >
//                 Sign In
//               </button>
//             </div>
//           </form>

//           <div className="mt-4 text-center">
//             <Link href="/signup" className="text-[#c2956b] hover:underline">
//               Don't have an account? Sign up
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;


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
    // Handle sign in logic here, like sending a request to an API
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

        {/* Sign In form container */}
        <div className="relative bg-black p-6 rounded-lg w-full max-w-md mx-auto">
          <h2 className="text-center text-white text-2xl mb-6 font-semibold">Sign In</h2>

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

            {/* Profile Picture Input */}
            <div>
              <label htmlFor="profile-picture" className="block text-white mb-2">Profile Picture</label>
              <input
                type="file"
                id="profile-picture"
                name="profile-picture"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="w-full p-4 rounded-md bg-white text-black focus:ring-[#c2956b] focus:border-[#c2956b] transition-all duration-200"
              />
              {profilePicture && (
                <div className="mt-2 flex items-center">
                  <img
                    src={URL.createObjectURL(profilePicture)}
                    alt="Profile Preview"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span className="ml-2 text-white">{profilePicture.name}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="w-full bg-[#c2956b] hover:bg-[#a5814f] text-white p-3 rounded-md font-semibold transition-colors duration-200"
              >
                Sign In
              </button>
            </div>
          </form>

          {/* Google Sign-In Button Section */}
          <div className="mt-6 text-center space-y-4">
            <button className="w-full flex items-center justify-center bg-gradient-to-r from-[#f1d350] to-[#DB4437] text-white p-3 rounded-md font-semibold transition-all">
              <FaGoogle className="mr-2 text-lg" />
              Sign in with Google
            </button>

            <div className="text-sm text-center">
              <Link href="/LogIn" className="text-[#c2956b] hover:underline">
               have an account? Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

