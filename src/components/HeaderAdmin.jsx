import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import authActions from '../redux/actions/auth.actions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function HeaderAdmin() {

    const [isOpen, setIsOpen] = useState(false)

    const [confirmLogout, setConfirmLogout] = useState(false)

    const { logout } = authActions

    const dispatch = useDispatch()

    const navigate = useNavigate()


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



    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    const handleConfirm = () => {
        setConfirmLogout(true)
    }

    const handleCancel = () => {
        setConfirmLogout(false)
    }




    return (
        <header className='w-full flex-col flex items-center justify-center'>
                <img className='w-60 pt-4 max-[768px]:hidden' src="/LogoSerenetyH.png" alt="Image logo Serenety Health Center" />
                <div className='bg-blue-800 w-full items-center justify-center gap-2 mt-4 hidden md:flex space-x-4 text-xl lg:gap-6'>
                    <NavLink to="/registerDoctor" className={({ isActive }) =>
                    isActive ? "p-2 text-center font-bold text-[#F19E22] hover:text-white" : "p-2 text-center font-bold text-white hover:text-[#F19E22]"}>Register Doctor</NavLink>
                    <NavLink to="/registerAdmin" className={({ isActive }) =>
                    isActive ? "p-2 text-center font-bold text-[#F19E22] hover:text-white" : "p-2 text-center font-bold text-white hover:text-[#F19E22]"}>Register Admin</NavLink>
                    <NavLink to="/appointmentsAdmin" className={({ isActive }) =>
                    isActive ? "p-2 text-center font-bold text-[#F19E22] hover:text-white" : "p-2 text-center font-bold text-white hover:text-[#F19E22]"}>Appointments</NavLink>
                    <NavLink to="/patientsAdmin" className={({ isActive }) =>
                    isActive ? "p-2 text-center font-bold text-[#F19E22] hover:text-white" : "p-2 text-center font-bold text-white hover:text-[#F19E22]"}>Patients</NavLink>
                    <NavLink to="/doctorsAdmin" className={({ isActive }) =>
                    isActive ? "p-2 text-center font-bold text-[#F19E22] hover:text-white" : "p-2 text-center font-bold text-white hover:text-[#F19E22]"}>Doctors</NavLink>
                    <div className='max-[767px]:hidden flex justify-center items-center'>
                        <img className='w-8 h-8 cursor-pointer' src="/LogoutOrangeAdmin.png" alt="Icon log out" onClick={handleConfirm} />
                    </div>
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
                        <div className="absolute w-full bg-blue-600 md:hidden z-50 flex flex-col items-start justify-start gap-4 top-[85px] pl-8 h-full">
                            <NavLink to="/registerDoctor" className={({ isActive }) =>
                            isActive ? "p-2 text-center font-bold pl-[28px] text-[#F19E22] hover:text-white" : "p-2 pl-[28px] text-center font-bold text-white hover:text-[#F19E22]"}>Register Doctor</NavLink>
                            <NavLink to="/registerAdmin" className={({ isActive }) =>
                            isActive ? "p-2 text-center font-bold pl-[28px] text-[#F19E22] hover:text-white" : "p-2 pl-[28px] text-center font-bold text-white hover:text-[#F19E22]"}>Register Admin</NavLink>
                            <NavLink to="/appointmentsAdmin" className={({ isActive }) =>
                            isActive ? "p-2 text-center font-bold pl-[28px] text-[#F19E22] hover:text-white" : "p-2 pl-[28px] text-center font-bold text-white hover:text-[#F19E22]"}>Appointments</NavLink>
                            <NavLink to="/patientsAdmin" className={({ isActive }) =>
                            isActive ? "p-2 text-center font-bold pl-[28px] text-[#F19E22] hover:text-white" : "p-2 pl-[28px] text-center font-bold text-white hover:text-[#F19E22]"}>Patients</NavLink>
                            <NavLink to="/doctorsAdmin" className={({ isActive }) =>
                            isActive ? "p-2 text-center font-bold pl-[28px] text-[#F19E22] hover:text-white" : "p-2 pl-[28px] text-center font-bold text-white hover:text-[#F19E22]"}>Doctors</NavLink>
                            <div className='flex items-center gap-2 cursor-pointer' onClick={handleConfirm}>
                                <img className='w-5 h-5' src="/LogoutWhiteAdmin.png" alt="Icon log out" />
                            <p className="block text-white font-semibold hover:text-[#F19E22]">Sign off</p>
                        </div>
                        </div>
                        
                    )}


                {confirmLogout && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className='font-semibold'>Do you really want to go out?</p>
                            <div className="flex justify-center gap-4 mt-4">
                                <button className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md w-[90px]" onClick={handleLogout}>Sign off</button>
                                <button className="bg-gray-400 font-semibold px-4 py-2 rounded-md w-[90px]" onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </header>
    )
}

export default HeaderAdmin