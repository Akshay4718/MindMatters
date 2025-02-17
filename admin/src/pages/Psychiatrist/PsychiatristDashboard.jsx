import React, { useEffect, useContext } from 'react'
import { PsychiatristContext } from '../../context/PsychiatristContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
const PsychiatristDashboard = () => {
  const { pToken, dashData, getDashData,completeAppointment,cancelAppointment } = useContext(PsychiatristContext)
  const { currency, slotDateFormat } = useContext(AppContext)


  

  useEffect(() => {
    if (pToken) {
      getDashData()
    }
  }, [pToken])

  // If dashData is null or undefined, return nothing or a loader
  if (!dashData) {
    return <p className="m-5">Loading...</p>
  }

  return (
    <div className="m-5">
      <div className="flex flex-wrap gap-3">
        {/* Earnings card */}
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img src={assets.earning_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{currency} {dashData.earnings}</p>
            <p className="text-xl font-semibold text-gray-600">Earnings</p>
          </div>
        </div>

        {/* Appointments card */}
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img src={assets.appointment_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
            <p className="text-xl font-semibold text-gray-600">Appointments</p>
          </div>
        </div>

        {/* Patients card */}
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img src={assets.patients_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashData.patients}</p>
            <p className="text-xl font-semibold text-gray-600">Patients</p>
          </div>
        </div>
      </div>

      <div className="bg-white mt-10">
        <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Latest Bookings</p>
        </div>
        <div className="pt-4 border border-t-0">
          {dashData.latestAppointments &&
            dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img className="rounded-full w-10" src={item.userData.image} alt="" />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item.userData.name}</p>
                  <p className="text-gray-800">{slotDateFormat(item.slotDate)}</p>
                </div>
                {
                  item.cancelled ?
                    <p className='text-red-400 text-xs font-medium'> Cancelled</p> :
                    item.isCompleted ?
                      <p className='text-green-400 text-xs font-medium'> Completed</p> :
                      <div className='flex'>
                        <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                        <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                      </div>
                }
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default PsychiatristDashboard
