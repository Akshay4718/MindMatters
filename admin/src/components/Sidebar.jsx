import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import {NavLink} from 'react-router-dom'
import { PsychiatristContext } from '../context/PsychiatristContext'
function Sidebar() {

    const {aToken} = useContext(AdminContext)
    const {pToken} = useContext(PsychiatristContext) 
  return (
    <div className='min-h-screen bg-white border-r'>
        {
            aToken && <ul className='text-gray-600 mt-5'>

            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/admin-dashboard'}>
                <img src={assets.home_icon} alt="" />
                <p className='hidden md:block'>Dashboard</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/all-appointments'}>
                <img src={assets.appointment_icon} alt="" />
                <p className='hidden md:block'>Appointments</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/add-psychiatrist'}>
                <img src={assets.add_icon} alt="" />
                <p className='hidden md:block'>Add Psychiatrists</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/psychiatrist-list'}>
                <img src={assets.people_icon} alt="" />
                <p className='hidden md:block'>Psychiatrist List</p>
            </NavLink>

            </ul>
        }
        {
            pToken && <ul className='text-gray-600 mt-5'>

            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/psychiatrist-dashboard'}>
                <img src={assets.home_icon} alt="" />
                <p className='hidden md:block'>Dashboard</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/psychiatrist-appointments'}>
                <img src={assets.appointment_icon} alt="" />
                <p className='hidden md:block'>Appointments</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/psychiatrist-profile'}>
                <img src={assets.people_icon} alt="" />
                <p className='hidden md:block'>Profile</p>
            </NavLink>

            </ul>
        }


    </div>
  )
}

export default Sidebar