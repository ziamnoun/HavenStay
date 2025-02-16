
'use client'
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function HomePage() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false); // State for main menu
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); // State for user dropdown
     useEffect(() => {
        const nextButton = document.querySelector('.swiper-button-next');
        const prevButton = document.querySelector('.swiper-button-prev');
    
        if (nextButton && prevButton) {
          nextButton.style.color = '#c2956b';
          prevButton.style.color = '#c2956b';
        }
      }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const mainMenu = document.querySelector('.dropdown');
      const userDropdown = document.querySelector('.user-dropdown');

      if (mainMenu && !mainMenu.contains(event.target)) {
        setIsOpen(false); // Close main menu
      }

      if (userDropdown && !userDropdown.contains(event.target)) {
        setIsUserDropdownOpen(false); // Close user dropdown
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const nextButton = document.querySelector('.swiper-button-next');
    const prevButton = document.querySelector('.swiper-button-prev');

    if (nextButton && prevButton) {
      nextButton.style.color = '#c2956b';
      prevButton.style.color = '#c2956b';
    }
  }, []);

  return (
    <div className="h-screen bg-white">
      <div className="div-upper-part h-[80%] bg-white grid grid-cols-1 md:grid-cols-3">
        {/* Left Section (Sidebar) */}
        <div className="div-1 bg-[#282828] col-span-1 border-r-2 border-black flex flex-col p-4">
          {/* Company Name and Menu */}
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <div className="Company-Name text-xl md:text-3xl text-white">
              <span className="text-[#c2956b]">Haven</span>Stay
            </div>
            <div className="dropdown relative">
              <button
                tabIndex={0}
                className="btn btn-ghost btn-circle"
                onClick={toggleMenu} // Toggle main menu
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#c2956b]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </button>
              {isOpen && (
                <ul className="menu absolute right-5 md:left-5 menu-sm w-[40vw] md:w-[50vw] dropdown-content bg-[#c2956b] rounded-box z-[2] mt-3 p-2 shadow">
                  <div className="div md:flex md:w-[50vw] justify-evenly">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/Properties">Explore Properties</Link></li>
                    <li><Link href="/Blog">Blog</Link></li>
                    <li><Link href="/About">About</Link></li>
                    <li><Link href="/Contact">Contact</Link></li>
                    {session ? (
                      <div className="user-dropdown relative border-2 rounded-lg border-black">
                        <div
                          tabIndex={0}
                          role="button"
                          className="btn btn-ghost btn-circle avatar"
                          onClick={toggleUserDropdown} // Toggle user dropdown
                        >
                          <div className="w-10 border-black border-1 rounded-full">
                            <img
                              alt="User Profile"
                              src={session.user?.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                            />
                          </div>
                        </div>
                        {isUserDropdownOpen && (
                          <ul
                            tabIndex={0}
                            className="menu menu-sm bg-[#c2956b] dropdown-content text-black rounded-box z-[1] mt-3 w-52 p-2 shadow"
                          >
                            <li>
                              <Link href="/Profile" className="justify-between">
                                Profile
                              </Link>
                            </li>
                            <li>
                              <Link href="/Post">Post</Link>
                            </li>
                            <li>
                              <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
                            </li>
                          </ul>
                        )}
                      </div>
                    ) : (
                      <div className="div"></div>
                    )}
                  </div>
                </ul>
              )}
            </div>
          </div>

          {/* Company Description */}
          <div className="company-description text-xs md:text-lg text-white mt-4 md:mt-16">
            <p className="text-2xl md:text-4xl">Rest House, Villas, Pent House, etc...</p>
            <p className="text-[#c2956b] mt-2 md:mt-10">
              Discover your perfect getaway with HavenStay. We offer luxurious villas, houses, hotel rooms and resorts for rent to make your stay unforgettable.
            </p>
            {session?( <Link href="/Properties">
              <button
                className="mt-auto md:mt-8 group bg-transparent relative inline-block overflow-hidden rounded border border-[#c2956b] px-12 py-3 text-sm font-medium text-white hover:text-[#c2956b] focus:outline-none focus:ring active:bg-[#c2956b] active:text-white"
              >
                <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-[#c2956b] transition-all duration-2000 group-hover:w-full"></span>
                <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-[#c2956b] transition-all duration-2000 group-hover:h-full"></span>
                <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-[#c2956b] transition-all duration-2000 group-hover:w-full"></span>
                <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-[#c2956b] transition-all duration-2000 group-hover:h-full"></span>
                Explore More
              </button>
            </Link>):( <Link href="/LogIn">
              <button
                className="mt-auto md:mt-8 group bg-transparent relative inline-block overflow-hidden rounded border border-[#c2956b] px-12 py-3 text-sm font-medium text-white hover:text-[#c2956b] focus:outline-none focus:ring active:bg-[#c2956b] active:text-white"
              >
                <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-[#c2956b] transition-all duration-2000 group-hover:w-full"></span>
                <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-[#c2956b] transition-all duration-2000 group-hover:h-full"></span>
                <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-[#c2956b] transition-all duration-2000 group-hover:w-full"></span>
                <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-[#c2956b] transition-all duration-2000 group-hover:h-full"></span>
                Log In
              </button>
            </Link>)}
           
          </div>
        </div>

        {/* Swiper Section */}
        <div className="div-2-sliding-part bg-transparent col-span-2 h-full">
        <Swiper
            navigation={true}
            autoplay={{ delay: 1500, disableOnInteraction: false }}
            effect="fade"
            speed={1000}
            modules={[Navigation, Autoplay, EffectFade]}
            className="mySwiper h-full"
          >
            <SwiperSlide>
              <img
                src="/Pics/—Pngtree—modern villa background with warm_15178008.png"
                alt="Slide 1"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/Pics/movie-night-by-pool-whole-family.jpg"
                alt="Slide 2"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/Pics/pngtree-living-room-with-a-view-over-the-city-at-night-image_2898420.jpg"
                alt="Slide 3"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      {/* Lower Section */}
      <div className="div-lower-part h-[20%] grid grid-cols-1 md:grid-cols-3 text-center md:text-left">
        {/* Contact Information and Social Media Icons */}
        <div className="div-1 bg-[#262626] md:border-r-2 border-black flex items-center justify-center text-white">
          <p className="text-xs md:text-base">© 2025 HavenStay</p>
        </div>
        <div className="div-2 bg-[#282828] col-span-2 text-white p-4 md:p-6 flex flex-col md:flex-row items-center justify-between">
          <div className="text-lg md:text-3xl font-bold mb-2 md:mb-0">
            <span className="text-[#c2956b]">Premium</span> Houses available
          </div>
          <div>
            <p className="text-xl md:text-2xl">Contacts</p>
            <div className="flex justify-center md:justify-start space-x-6 mt-2">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#c2956b] hover:text-white">
                <FaFacebook size={24} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#c2956b] hover:text-white">
                <FaInstagram size={24} />
              </a>
              <a href="mailto:ziam.2108055.ruet.mte@email.com" className="text-[#c2956b] hover:text-white">
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
