import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Autoplay } from 'swiper/modules'
import { NavLink } from 'react-router-dom'


export default function Carrousel() {

    return (
    <>
    <Swiper
        // autoplay={{
        // delay: 4000, 
        // disableOnInteraction: false, 
        // }}

        pagination={{
            dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay]}
        className="w-full md:w-2/3 max-h-full object-cover mt-[20px]"
    >
        <SwiperSlide>
                <div className='relative'>
                    <div className='absolute w-[500px] h-[450px] max-[767px]:hidden'>
                        <p className='absolute font-bold xl:text-5xl xl:pl-4 xl:pt-4 text-[#06A9B2] md:text-3xl'>Get your checkups and studies at Serenety Health Center.</p>
                        <p className='absolute font-bold xl:text-2xl xl:pl-4 xl:pt-4 text-[#06A9B2] xl:top-[200px] md:top-[80px]'>We take care of your health.</p>
                        <NavLink to="/specialtiesHome" className='absolute bg-[#F19E22] font-bold text-white xl:text-3xl xl:w-72 xl:h-14 rounded-lg 
                            xl:top-[270px] xl:ml-4 md:w-48 md:h-10 md:top-[120px] pl-11 pt-[7px]'>See Specialties</NavLink>
                    </div>
                    <img src="/Image01.png" alt="Image family"/>
                </div>
                <p className='font-bold text-3xl pl-4 pt-4 text-[#06A9B2] min-[768px]:hidden'>Get your checkups and studies at Serenety Health Center.</p>
                <p className='font-bold text-2xl pl-4 text-[#06A9B2] min-[768px]:hidden'>We take care of your health.</p>
                <NavLink to="/specialtiesHome" className='mt-8 min-[500px]:mt-0 relative'>
                    <button className='absolute bg-[#F19E22] font-bold text-white w-40 h-10 rounded-lg top-[0px] ml-4 mt-4 min-[768px]:hidden'>See Specialties</button>
                </NavLink>
                {/* <div className='mt-8 min-[500px]:mt-0 relative'>
                    <NavLink to="/specialtiesHome" className='absolute bg-[#F19E22] font-bold text-white w-40 h-10 rounded-lg top-[0px] 
                    ml-4 mt-4 min-[768px]:hidden pl-4 pt-2'>See Specialties</NavLink>
                </div> */}
        </SwiperSlide>
        

        <SwiperSlide>
                <div className='relative'>
                    <div className='absolute w-[500px] h-[450px] max-[767px]:hidden'>
                        <p className='absolute font-bold xl:text-5xl xl:pl-4 xl:pt-4 text-[#06A9B2] md:text-3xl'>Neurology, Clinical Neurosurgery and Spine Surgery at INECCU.</p>
                        <p className='absolute font-bold xl:text-2xl xl:pl-4 xl:pt-4 text-[#06A9B2] xl:top-[200px] md:top-[80px]'>Specialists for a better quality of life.</p>
                        <div className='flex flex-col'>
                            <NavLink to="/ineccu" className='absolute bg-[#F19E22] font-bold text-white xl:text-3xl xl:w-72 xl:h-14 rounded-lg 
                            xl:top-[270px] xl:ml-4 md:w-48 md:h-10 md:top-[120px] pl-14 pt-[7px]'>View More</NavLink>
                        </div>
                    </div>
                    <img src="/Image02.png" alt="Image family"/>
                </div>
                <p className='font-bold text-3xl pl-4 pt-4 text-[#06A9B2] min-[768px]:hidden'>Neurology, Clinical Neurosurgery and Spine Surgery at INECCU.</p>
                <p className='font-bold text-2xl pl-4 text-[#06A9B2] min-[768px]:hidden'>Specialists for a better quality of life.</p>
                <div className='flex flex-col mb-8'>
                    <NavLink to="/ineccu" className='bg-[#F19E22] font-bold text-white w-40 h-10 rounded-lg top-[150px] 
                    ml-4 mt-4 min-[768px]:hidden pl-10 pt-2'>View More</NavLink>
                </div>

        </SwiperSlide>
    </Swiper>
    </>
    )
}

