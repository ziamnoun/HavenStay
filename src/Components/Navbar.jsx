'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#282828] text-white px-4 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Name */}
        <Link href="/" className="text-3xl font-bold">
          <span className="text-[#c2956b]">Haven</span>Stay
        </Link>

        {/* Mobile Menu Icon */}
        <button
          className="text-[#c2956b] text-2xl md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg">
          <li><Link href="/" className="hover:text-[#c2956b]">Home</Link></li>
          <li><Link href="/properties" className="hover:text-[#c2956b]">Explore Properties</Link></li>
          <li><Link href="/blog" className="hover:text-[#c2956b]">Blog</Link></li>
          <li><Link href="/about" className="hover:text-[#c2956b]">About</Link></li>
          <li><Link href="/contact" className="hover:text-[#c2956b]">Contact</Link></li>
          <li>
            <Link href="/login">
              <button className="border-2 border-[#c2956b] rounded-md px-3 py-1 hover:bg-[#c2956b]">Log In</button>
            </Link>
          </li>
          <li>
            <Link href="/signup">
              <button className="border-2 border-[#c2956b] rounded-md px-3 py-1 hover:bg-[#c2956b]">Sign Up</button>
            </Link>
          </li>
        </ul>

        {/* Mobile Slide-In Menu */}
        <div
          className={`fixed top-0 left-0 h-full w-[70vw] bg-[#282828] transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } z-50`}
        >
          <ul className="mt-16 space-y-6 text-lg px-4">
            <li><Link href="/" className="block text-[#c2956b]" onClick={toggleMenu}>Home</Link></li>
            <li><Link href="/Properties" className="block text-[#c2956b]" onClick={toggleMenu}>Explore Properties</Link></li>
            <li><Link href="/Blog" className="block text-[#c2956b]" onClick={toggleMenu}>Blog</Link></li>
            <li><Link href="/About" className="block text-[#c2956b]" onClick={toggleMenu}>About</Link></li>
            <li><Link href="/Contact" className="block text-[#c2956b]" onClick={toggleMenu}>Contact</Link></li>
            <li>
              <Link href="/LogIn" onClick={toggleMenu}>
                <button className="w-full border-2 border-[#c2956b] rounded-md px-4 py-2 hover:bg-[#c2956b]">
                  Log In
                </button>
              </Link>
            </li>
            <li>
              <Link href="/SignUp" onClick={toggleMenu}>
                <button className="w-full border-2 border-[#c2956b] rounded-md px-4 py-2 hover:bg-[#c2956b]">
                  Sign Up
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
