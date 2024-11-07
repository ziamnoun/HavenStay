
'use client'
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';  
import { Navigation, Autoplay, EffectFade } from 'swiper/modules'; 
import { FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa'

export default function HomePage() {
  
  useEffect(() => {
    const nextButton = document.querySelector('.swiper-button-next');
    const prevButton = document.querySelector('.swiper-button-prev');

    if (nextButton && prevButton) {
      nextButton.style.color = '#c2956b';
      prevButton.style.color = '#c2956b';
    }
  }, []);

  return (
    <div className='h-screen bg-white'>
      <div className="div-upper-part h-[80%] bg-slate-500 grid grid-cols-3">
        <div className="div-1 bg-[#282828] col-span-1 border-r-2 border-black">
          <div className="Comany-Name text-3xl text-white mt-auto lg:mt-6 mx-6">
            <span className='text-[#c2956b]'>Haven</span>Stay
          </div>
          <div className="company-description text-lg text-white mt-4 md:mt-16 px-6">
            <p className='text-4xl'>
              Rest House, Villas, Pent House etc...
            </p>
            <p className='text-[#c2956b] mt-auto lg:mt-10'>
              Discover your perfect getaway with HavenStay. We offer luxurious villas, houses, and resorts for rent to make your stay unforgettable.
            </p>
            <button
              href="#"
              className="mt-auto md:mt-8 group bg-transparent relative inline-block overflow-hidden rounded border border-[#c2956b] px-12 py-3 text-sm font-medium text-white hover:text-[#c2956b] focus:outline-none focus:ring active:bg-[#c2956b] active:text-white"
            >
              <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-[#c2956b] transition-all duration-2000 group-hover:w-full"></span>
              <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-[#c2956b] transition-all duration-2000 group-hover:h-full"></span>
              <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-[#c2956b] transition-all duration-2000 group-hover:w-full"></span>
              <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-[#c2956b] transition-all duration-2000 group-hover:h-full"></span>
              Signup
            </button>
          </div>
        </div>

        <div className="div-2-sliding-part bg-transparent col-span-2 h-full">
          <Swiper
            navigation={true}
            autoplay={{ delay: 1500, disableOnInteraction: false }} 
            effect="fade"  
            speed={1000}    
            modules={[Navigation, Autoplay, EffectFade]} 
            className="mySwiper h-full"
          >
            <SwiperSlide className="flex h-full">
              <img
                src="/Pics/—Pngtree—modern villa background with warm_15178008.png"
                alt="Slide 1"
                className="flex-1 w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide className="flex h-full">
              <img
                src="/Pics/movie-night-by-pool-whole-family.jpg"
                alt="Slide 2"
                className="flex-1 w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide className="flex h-full">
              <img
                src="/Pics/pngtree-living-room-with-a-view-over-the-city-at-night-image_2898420.jpg"
                alt="Slide 3"
                className="flex-1 w-full h-full object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="div-lower-part h-[20%] grid grid-cols-3">
        <div className="div-1 bg-[#262626] col-span-1 border-r-2 border-black">fffff</div>
        
        <div className="div-2 bg-[#282828] col-span-2 text-white p-6 flex justify-between items-center">
          <div className="text-3xl font-bold text-white mb-4">
            <span className="text-[#c2956b]">54</span> Houses available
          </div>

          {/* Social Media Icons */}
          <div className="div">
            <p className='text-3xl text-White'>Contacts</p>
            <div className="flex space-x-6 mt-2">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#c2956b] hover:text-white transition-colors">
                <FaFacebook size={30} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#c2956b] hover:text-white transition-colors">
                <FaInstagram size={30} />
              </a>
              <a href="ziam.2108055.ruet.mte@email.com" className="text-[#c2956b] hover:text-white transition-colors">
                <FaEnvelope size={30} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

