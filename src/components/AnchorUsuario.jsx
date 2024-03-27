import React from 'react'
import { NavLink } from 'react-router-dom'


function Anchor({href, title}) {
    return (
            <NavLink to={href} className={({ isActive }) =>
            isActive 
            ? "bg-white h-full rounded-t-lg p-2 text-[17px] text-center font-semibold text-[#F19E22]" 
            : " p-2 text-[18px] hover:bg-white text-center font-semibold text-white hover:text-[#F19E22] hover:h-full rounded-t-lg"}
            >{title}</NavLink>
    )
}

export default Anchor