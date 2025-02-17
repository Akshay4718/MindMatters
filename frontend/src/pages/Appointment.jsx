import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedPsychiatrists from '../components/RelatedPsychiatrists'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const { psyId } = useParams()
  const { psychiatrist, currencySymbol, backendUrl, token, getPsychiatristData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const navigate = useNavigate()

  const [psyInfo, setPsyInfo] = useState(null)
  const [psySlots, setPsySlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [isOnline, setIsOnline] = useState(false)

  const fetchPsyInfo = async () => {
    const info = psychiatrist.find((doc) => doc._id === psyId)
    setPsyInfo(info)
  }

  const getAvailableSlots = async () => {
    setPsySlots([])
    let today = new Date()
    if (!psyInfo) return
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)
      if (today.getDate() === currentDate.getDate()) {
        let currentHour = today.getHours()
        let currentMinutes = today.getMinutes()
        currentDate.setHours(currentHour >= 10 ? currentHour : 10)
        if (currentMinutes < 30) {
          currentDate.setMinutes(30)
        } else {
          currentDate.setHours(currentHour + 1)
          currentDate.setMinutes(0)
        }
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }
      let timeslots = []
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()
        const slotDate = day + '_' + month + '_' + year
        const isSlotAvailable =
          psyInfo.slots_booked[slotDate] && psyInfo.slots_booked[slotDate].includes(formattedTime)
            ? false
            : true
        if (isSlotAvailable) {
          timeslots.push({
            dateTime: new Date(currentDate),
            time: formattedTime
          })
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      setPsySlots((prev) => [...prev, timeslots])
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book Appointment')
      return navigate('/login')
    }
    try {
      const date = psySlots[slotIndex][0].dateTime
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      const slotDate = day + '_' + month + '_' + year
      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        {
          psyId,
          slotDate,
          slotTime,
          onlineMode: isOnline
        },
        { headers: { token } }
      )
      if (data.success) {
        toast.success(data.message)
        getPsychiatristData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchPsyInfo()
  }, [psychiatrist, psyId])

  useEffect(() => {
    if (psyInfo) getAvailableSlots()
  }, [psyInfo])

  return (
    psyInfo && (
      <div>
        <div className='flex flex-col sm:flex-row gap-4'>
          <div>
            <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={psyInfo.image} alt='' />
          </div>
          <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm-mx-0 mt-[-80px] sm:mt-0'>
            <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
              {psyInfo.name} <img className='w-5' src={assets.verified_icon} alt='' />
            </p>
            <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
              <p>
                {psyInfo.degree}-{psyInfo.speciality}
              </p>
              <button className='py-0.5 px-2 border text-xs rounded-full'>{psyInfo.experience}</button>
            </div>
            <div>
              <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
                About <img src={assets.info_icon} alt='' />
              </p>
              <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{psyInfo.about}</p>
            </div>
            <p className='text-gray-500 font-medium mt-4'>
              Appointment fee <span className='text-gray-600'>{currencySymbol} {psyInfo.fees}</span>
            </p>
          </div>
        </div>

        <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
          <p>Booking slots</p>
          <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
            {psySlots.length &&
              psySlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index ? 'bg-primary text-white ' : 'border border-gray'
                  }`}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                  <p>{item[0] && item[0].dateTime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
            {psySlots.length &&
              psySlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          {/* Choose Online or Offline */}
          <div className='mt-4'>
            <label className='mr-4'>
              <input
                type='radio'
                name='consultMode'
                checked={!isOnline}
                onChange={() => setIsOnline(false)}
              />
              <span className='ml-1'>Offline</span>
            </label>
            <label>
              <input
                type='radio'
                name='consultMode'
                checked={isOnline}
                onChange={() => setIsOnline(true)}
              />
              <span className='ml-1'>Online</span>
            </label>
          </div>

          <button
            onClick={bookAppointment}
            className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'
          >
            Book an Appointment
          </button>
        </div>
        <RelatedPsychiatrists psyId={psyId} speciality={psyInfo.speciality} />
      </div>
    )
  )
}

export default Appointment
