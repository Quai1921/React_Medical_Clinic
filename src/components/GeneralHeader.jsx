import React, { Fragment, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'




const GeneralHeader = () => {


    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isOpen])


    return (
        <>
            <header className='w-full flex-col flex items-center justify-center'>
                <div className='flex items-center w-[100%] justify-around'>
                    <img className='w-60 pt-4 max-[768px]:hidden' src="/LogoSerenetyH.png" alt="Image logo Serenety Health Center" />
                    <div className='flex gap-6 pt-4'>
                        <NavLink to="/register" className="max-[768px]:hidden w-[120px] p-2 text-center font-bold text-white hover:text-white bg-[#F19E22] rounded-xl hover:bg-[#dc901e]">Sign up</NavLink>
                        <NavLink to="/login" className="max-[768px]:hidden w-[120px] p-2 text-center font-bold text-white bg-[#F19E22] rounded-xl hover:bg-[#dc901e]">Sign in</NavLink>
                    </div>
                    
                </div>
                <div className='bg-blue-800 w-full items-center justify-center gap-4 mt-4 hidden md:flex space-x-4 text-xl'>
                    <NavLink to="/" className={({ isActive }) =>
                        isActive ? "p-2 text-center font-bold text-[#F19E22] hover:text-white" : "p-2 text-center font-bold text-white hover:text-[#F19E22]"}>Home</NavLink>
                    <NavLink to="/specialtiesHome" className={({ isActive }) =>
                        isActive ? "p-2 text-center font-bold text-[#F19E22] hover:text-white" : "p-2 text-center font-bold text-white hover:text-[#F19E22]"}>Medical Specialties</NavLink>
                    <NavLink to="/contact" className={({ isActive }) =>
                        isActive ? "p-2 text-center font-bold text-[#F19E22] hover:text-white" : "p-2 text-center font-bold text-white hover:text-[#F19E22]"}>Contact</NavLink>
                    
                    
                </div>

                <div className="md:hidden flex justify-between items-center w-full px-10 py-3">
                            <button onClick={toggleMenu} className="text-white focus:outline-none pt-6">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="black">
                                    {isOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                            <img className='w-40 pt-4' src="/LogoSerenetyH.png" alt="Image logo Serenety Health Center" />
                </div>
                {isOpen && (
                        <div className="absolute w-full bg-blue-600 md:hidden z-50 flex flex-col items-start justify-start gap-4 top-[100px] pl-8 h-full">
                            <NavLink to="/" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Home</NavLink>
                            <NavLink to="/specialtiesHome" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Medical Specialties</NavLink>
                            <NavLink to="/contact" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Contact</NavLink>
                            <hr className='w-[95%]' />
                            <NavLink to="/register" className="p-2 text-center font-bold text-[#F19E22] hover:text-white">Sign up</NavLink>
                            <NavLink to="/login" className="p-2 text-center font-bold text-[#F19E22] hover:text-white">Sign in</NavLink>
                        </div>
                    )}
            </header>
        </>
        
    )
}

export default GeneralHeader