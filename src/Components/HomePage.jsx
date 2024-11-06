import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';


export default function HomePage() {
  return (
    <div className='min-h-screen bg-white'>
        {/*upper part using flex layout */}
        <div className="div-upper-part h-[80%] bg-slate-500 grid grid-cols-3">
            <div className="div-1 bg-[#282828] col-span-1">
                <div className="Comany-Name text-3xl text-white"><span className='text-[#c2956b]'>Haven</span>Stay</div>
            </div>
            <div className="div-2-sliding part bg-yellow-500 col-span-2">
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
