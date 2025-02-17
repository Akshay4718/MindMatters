import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
const Psychiatrist = () => {

  const { speciality } = useParams();
  const navigate = useNavigate()
  const [showFilter, setShowFilter] = useState(false)
  const { psychiatrist } = useContext(AppContext)
  const [filterPsy, setFilterPsy] = useState([])
  const applyFilter = () => {
    if (speciality) {
      setFilterPsy(psychiatrist.filter(doc => doc.speciality === speciality))
    }
    else {
      setFilterPsy(psychiatrist)
    }
  }
  useEffect(() => {
    applyFilter()
  }, [psychiatrist, speciality])
  return (
    <div>
      <p className='text-gray-600'>
        Browse through the list
      </p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filter</button>
        <div className={` flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex" : 'hidden sm:flex'}`}>
          <p
            onClick={() => speciality === 'General Psychiatrist' ? navigate('/psychiatrist') : navigate('/psychiatrist/General Psychiatrist')}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer ${speciality === "General Psychiatrist" ? "bg-indigo-100 text-black" : ""}`}
          >
            General Psychiatrist
          </p>

          <p
            onClick={() => speciality === 'Child & Adolescent Psychiatrist' ? navigate('/psychiatrist') : navigate('/psychiatrist/Child & Adolescent Psychiatrist')}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer ${speciality === "Child & Adolescent Psychiatrist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Child & Adolescent Psychiatrist
          </p>

          <p
            onClick={() => speciality === 'Geriatric Psychiatrist' ? navigate('/psychiatrist') : navigate('/psychiatrist/Geriatric Psychiatrist')}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer ${speciality === "Geriatric Psychiatrist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Geriatric Psychiatrist
          </p>

          <p
            onClick={() => speciality === 'Addiction Psychiatrist' ? navigate('/psychiatrist') : navigate('/psychiatrist/Addiction Psychiatrist')}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer ${speciality === "Addiction Psychiatrist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Addiction Psychiatrist
          </p>

          <p
            onClick={() => speciality === 'Neuro Psychiatrist' ? navigate('/psychiatrist') : navigate('/psychiatrist/Neuro Psychiatrist')}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer ${speciality === "Neuro Psychiatrist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Neuro Psychiatrist
          </p>

          <p
            onClick={() => speciality === 'Occupational Psychiatrist' ? navigate('/psychiatrist') : navigate('/psychiatrist/Occupational Psychiatrist')}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer ${speciality === "Occupational Psychiatrist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Occupational Psychiatrist
          </p>

        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterPsy.map((item, index) => (
              <div onClick={() => navigate(`/appointment/${item._id}`)} key={index} className='border border-black-400 rounded-xl overflow-hidden cursor-pointer hover:scale-105'>
                <img className='bg-gray-50' src={item.image} alt="" />
                <div className='p-4'>
                  <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                    <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></p><p className={` ${item.available ? 'text-green-500' : 'text-red-500'} rounded-full`}>{item.available ? 'Available' : 'Not Available'}</p>
                  </div>
                  <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                  <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Psychiatrist