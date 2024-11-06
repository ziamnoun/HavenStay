'use client'
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';


export default function HomePage() {
  return (
    <div className='h-screen bg-white'>
        {/*upper part using flex layout */}
        <div className="div-upper-part h-[80%] bg-slate-500 grid grid-cols-3">
                        <div className="div-1 bg-[#282828] col-span-1">
                    <div className="Comany-Name text-3xl text-white mt-auto lg:mt-6 mx-6">
                        <span className='text-[#c2956b]'>Haven</span>Stay
                    </div>
                    <div className="company-description text-lg text-white mt-4 lg:mt-8 px-6">
                        <p className='text-4xl'>
                            Rest House,Villas,Pent House etc...
                        </p>


                        <p className='text-[#c2956b] mt-auto lg:mt-10'>
                            Discover your perfect getaway with HavenStay. We offer luxurious villas, houses, and resorts for rent to make your stay unforgettable.
                        </p>
                       
                        
                        {/* <button className=' btn text-white border-2 border-[#c2956b]  mt-auto lg:mt-10'>Contact us</button> */}
                        <button href="#"
                                className="mt-auto md:mt-8 group bg-transparent relative inline-block overflow-hidden rounded border border-[#c2956b]   px-12 py-3 text-sm font-medium text-white hover:text-[#c2956b]focus:outline-none focus:ring active:bg-[#c2956b] active:text-white">
                                <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-[#c2956b] transition-all duration-200 group-hover:w-full"></span>
                                <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-[#c2956b] transition-all duration-200 group-hover:h-full"></span>
                                <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-[#c2956b] transition-all duration-200 group-hover:w-full"></span>
                                <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-[#c2956b] transition-all duration-200 group-hover:h-full"></span>
                                Signup
                            </button>


                    </div>
                </div>

            <div className="div-2-sliding-part bg-transparent col-span-2 h-full">
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                <SwiperSlide>
                        <div>
                            <img 
                                src="https://i.ibb.co/02Xy1Yw/360-F-429356296-CVQ5-Lk-C6-Pl55k-UNLq-Lis-VKg-Tw9vjyif1.jpg" 
                                alt="Slide 1" 
                                className="h-screen lg:min-h-screen bg-cover bg-center"
                            />
                        </div>
                </SwiperSlide>
                <SwiperSlide>
                        <div>
                            <img 
                                src="https://i.ibb.co/02Xy1Yw/360-F-429356296-CVQ5-Lk-C6-Pl55k-UNLq-Lis-VKg-Tw9vjyif1.jpg" 
                                alt="Slide 1" 
                                className="h-screen lg:min-h-screen bg-cover bg-center"
                            />
                        </div>
                </SwiperSlide>
                <SwiperSlide>
                        <div>
                            <img 
                                src="https://i.ibb.co/02Xy1Yw/360-F-429356296-CVQ5-Lk-C6-Pl55k-UNLq-Lis-VKg-Tw9vjyif1.jpg" 
                                alt="Slide 1" 
                                className="h-screen lg:min-h-screen bg-cover bg-center"
                            />
                        </div>
                </SwiperSlide>
             </Swiper>

            </div>
        </div>
        
        {/* Lower part using flex layout */}
        <div className="div-lower-part h-[20%] bg-red-950 grid grid-cols-3">
            <div className="div-1 bg-green-500 col-span-1">fffff</div>
            <div className="div-2 bg-purple-500 col-span-2">222</div>
        </div>
    </div>
  )
}
