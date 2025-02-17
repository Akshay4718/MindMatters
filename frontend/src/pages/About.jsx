import React from 'react'
import { assets } from '../assets/assets'
const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>At MindMatters, we are dedicated to making mental health support accessible, convenient, and personalized. We understand that seeking help can be challenging due to stigma, long waiting periods, or logistical hurdles, which is why we have created a seamless online platform that connects individuals with licensed psychiatrists and mental health professionals.

            Our goal is to provide a secure and supportive environment where anyone can receive the professional care they deserve—anytime, anywhere. Whether you are dealing with stress, anxiety, depression, or other mental health challenges, we ensure that help is just a few clicks away.</p>

          <b className='text-gray-600'>Our vision</b>
          <p>We envision a world where mental health care is not a privilege but a fundamental right. Through technology and innovation, we aim to eliminate the barriers to seeking professional help, making mental wellness an achievable goal for everyone. By offering flexible and reliable psychiatric consultations, we strive to foster a culture where seeking mental health support is as normal as visiting a doctor for physical health concerns.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] cursor-pointer'>
          <b>Efficiency:</b>
          <p>Timely support is crucial when dealing with mental health concerns. Our platform is designed to connect users with qualified psychiatrists quickly and efficiently, reducing long wait times and making mental health care more approachable. Whether you need an urgent consultation or regular follow-ups, our streamlined booking system ensures that you receive care when you need it the most.

          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] cursor-pointer'>
          <b>Convenience:</b>
          <p>Gone are the days of scheduling hassles, long commutes, and waiting rooms. With our user-friendly platform, you can book, reschedule, and attend sessions from the comfort of your home. We offer:

            ✔ Flexible scheduling to suit your availability
            ✔ Video consultations & chat-based therapy for your convenience
            ✔ Secure and private sessions to maintain confidentiality

            Mental health care should fit into your life seamlessly, and we make that possible.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] cursor-pointer'>
          <b>Personalization:</b>
          <p>We believe that mental health care should be tailored to the individual. Everyone has unique experiences, challenges, and preferences, which is why we offer personalized recommendations to match you with the right psychiatrist.

            Our system considers factors like your concerns, preferred communication style, and therapy goals, ensuring that you receive care that aligns with your needs. With a diverse team of professionals specializing in various mental health areas, we ensure that you get the right support from the right expert.</p></div>
      </div>
    </div>
  )
}

export default About