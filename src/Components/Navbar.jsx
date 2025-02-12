
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

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
          <li>
            <Link href="/" className="hover:text-[#c2956b]">
              Home
            </Link>
          </li>
          <li>
            <Link href="/Properties" className="hover:text-[#c2956b]">
              Explore Properties
            </Link>
          </li>
          <li>
            <Link href="/blog" className="hover:text-[#c2956b]">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-[#c2956b]">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-[#c2956b]">
              Contact
            </Link>
          </li>

          {/* Show User Dropdown if Logged In */}
          {session ? (
            <div   onClick={toggleMenu} className="dropdown border-2 rounded-lg border-[#c2956b] dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Profile"
                    src={session.user?.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm bg-[#c2956b] dropdown-content text-black  rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link href="/profile" className="justify-between">
                    Profile
                    
                  </Link>
                </li>
                <li>
                  <Link href="/settings">Settings</Link>
                </li>
                <li>
                  <button onClick={() => signOut()}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <li>
                <Link href="/LogIn">
                  <button className="border border-[#c2956b] px-4 py-2 rounded-md hover:bg-[#c2956b]">
                    Log In
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/SignUp">
                  <button className="border border-[#c2956b] px-4 py-2 rounded-md hover:bg-[#c2956b]">
                    Sign Up
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Slide-In Menu */}
        <div
          className={`fixed top-0 left-0 h-full w-[70vw] bg-[#282828] transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } z-50`}
        >
          <ul className="mt-16 space-y-6 text-lg px-4">
            <li>
              <Link
                href="/"
                className="block text-[#c2956b]"
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/Properties"
                className="block text-[#c2956b]"
                onClick={toggleMenu}
              >
                Explore Properties
              </Link>
            </li>
            <li>
              <Link
                href="/Blog"
                className="block text-[#c2956b]"
                onClick={toggleMenu}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/About"
                className="block text-[#c2956b]"
                onClick={toggleMenu}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/Contact"
                className="block text-[#c2956b]"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </li>

            {/* Mobile Menu: User Dropdown or Login/Signup */}
            {session ? (
              <li className="mt-4">
                <div className="div">User Information</div>
                <div className=" items-center gap-3">
                  <img
                    alt="User Profile"
                    src={session.user?.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-[#c2956b]">{session.user?.name}</span>
                </div>
                <ul className="mt-2 space-y-2">
                  <li>
                    <Link href="/profile" className="text-[#c2956b]">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/settings" className="text-[#c2956b]">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        signOut();
                        toggleMenu();
                      }}
                      className="text-red-500"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
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
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
