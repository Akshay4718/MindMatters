import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 text-white p-4'>


      <div className='md:w-1/2 flex flex-col justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
        <p className='text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight md:leading-tight lg:leading-tight'> 
          Book Appointment <br /> with a psychiatrist
        </p>  
          <div className='flex flex-col md:flex-row gap-3 items-center text-white text-sm font-light'>
            <p>Choose a psychiatrist and book an appointment</p>
          </div>
          <a href="#speciality" className='flex w-44 items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0  hover:scale-105'>
            Book an appointment <img className='w-3' src={assets.arrow_icon} alt="" />
          </a>
        
      </div>

      <div className='md:w-1/2 relative'>
        <img className='w-full mb-12 md:absolute bottom-0 h-auto rounded-lg' src={assets.image} alt="" />
      </div>

    </div>
  )
}

export default Header