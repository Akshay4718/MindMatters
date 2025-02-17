import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { PsychiatristContext } from '../../context/PsychiatristContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const PsychiatristAppointments = () => {
  const {
    pToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,backendUrl
  } = useContext(PsychiatristContext)

  const {  slotDateFormat ,calculateAge} = useContext(AppContext)
  const [localAppointments, setLocalAppointments] = useState([])

  useEffect(() => {
    if (pToken) {
      getAppointments()
    }
  }, [pToken])

  useEffect(() => {
    setLocalAppointments(appointments)
  }, [appointments])

  const createMeeting = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl+'/api/psychiatrist/create-meeting',
        { appointmentId },
        { headers: { ptoken: pToken } }
      )
      if (data.success) {
        const updated = localAppointments.map((appt) =>
          appt._id === appointmentId ? { ...appt, meetingLink: data.meetingLink } : appt
        )
        setLocalAppointments(updated)
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b '>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {localAppointments.map((item, index) => (
          <div
            className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b'
            key={item._id}
          >
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full' src={item.userData.image} alt='' />
              <p>{item.userData.name}</p>
            </div>
            <div>
              <p className='text-xs inline border border-primary px-2 rounded-full '>
                {item.payment ? 'Online' : 'CASH'}
              </p>
            </div>
            <p className='max-sm:hidden'>
              {/* Example age calculation if you have a function for that */}
              {calculateAge(item.userData.dob)} years 
            </p>
            <p>
              {slotDateFormat(item.slotDate)} , {item.slotTime}
            </p>
            <p>{item.amount}</p>
            {item.cancelled ? (
              <p className='text-red-400 text-xs font-medium'> Cancelled</p>
            ) : item.isCompleted ? (
              <p className='text-green-400 text-xs font-medium'> Completed</p>
            ) : (
              <div className='flex flex-col gap-1'>
                <div className='flex gap-2'>
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className='w-10 cursor-pointer'
                    src={assets.cancel_icon}
                    alt=''
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    className='w-10 cursor-pointer'
                    src={assets.tick_icon}
                    alt=''
                  />
                </div>
                {item.onlineMode && item.payment && (
                  <div className='mt-2'>
                    {item.meetingLink ? (
                      <a
                        href={item.meetingLink}
                        target='_blank'
                        rel='noreferrer'
                        className='inline-block bg-blue-600 text-white px-2 py-1 rounded text-xs'
                      >
                        Start Meeting
                      </a>
                    ) : (
                      <button
                        onClick={() => createMeeting(item._id)}
                        className='bg-green-500 text-white px-2 py-1 rounded text-xs'
                      >
                        Create Meeting
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PsychiatristAppointments
