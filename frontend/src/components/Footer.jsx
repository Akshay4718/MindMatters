import React from 'react'
import {assets} from '../assets/assets'
const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img className='mb-5 w-40 h-12 ml-0 pl-0' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>At MindMatters, we are committed to breaking the stigma, improving accessibility, and prioritizing mental well-being. Whether you need ongoing therapy, a one-time consultation, or simply a safe space to talk, we are here to support you.

Start your journey towards better mental health today—because your mind matters. </p>
            </div>
                   
            <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul> 
            </div>
                
            <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600' >
                    <li>+91-8217262095</li>
                    <li>team@gmail.com</li>
                </ul>
            </div>
        </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025@ MindMatters - All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer