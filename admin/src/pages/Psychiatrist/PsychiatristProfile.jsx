import React, { useEffect, useState, useContext } from 'react'
import { PsychiatristContext } from '../../context/PsychiatristContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const PsychiatristProfile = () => {
  const { pToken, profileData, setProfileData, getProfileData,backendUrl } = useContext(PsychiatristContext)
  const { currency } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try{
    const updateData = {
      address:profileData.address,
      fees: profileData.fees,
      available: profileData.available
    }
    const {data} = await axios.post(backendUrl+'/api/psychiatrist/update-profile',updateData,{headers:{pToken}})
    if(data.success){
      toast.success(data.message)
      setIsEdit(false)
      getProfileData()
    }else{
      toast.error(data.message)
    }
  }catch(error){
    toast.error(error.message)
    console.log(error)
  }

  }

  useEffect(() => {
    if (pToken) {
      getProfileData()
    }
  }, [pToken])

  // Placeholder for saving the updated fees


  return (
    profileData && (
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img
            className='bg-primary/80 w-full sm:max-w-64 rounded-lg'
            src={profileData.image}
            alt=''
          />
        </div>
        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>
            {profileData.name}
          </p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>
              {profileData.degree} - {profileData.speciality}
            </p>
            <button className='py-0.5 px-2 text-xs rounded-full '>
              {profileData.experience}
            </button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>
              About:
            </p>
            <p className='text-gray-600 text-sm max-w-[700px] mt-1'>{profileData.about}</p>
          </div>
          <p className='text-gray-600 font-medium mt-4'>
            Appointment Fees: <span className='text-gray-800'>{currency}</span>{' '}
            {isEdit ? (
              <input
                className='w-28 border rounded px-1'
                type='number'
                value={profileData.fees}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    fees: e.target.value,
                  }))
                }
              />
            ) : (
              profileData.fees
            )}
          </p>
          <div className='flex gap-2 py-2'>
            <p>Address:</p>
            <p className='text-sm'>
              {isEdit? <input type="text" onChange={(e)=>setProfileData((prev)=>({...prev,address:{...prev.address,line1:e.target.value}}))} value={profileData.address.line1}/> : profileData.address.line1} <br /> 
              <br />
              {isEdit? <input type="text" onChange={(e)=>setProfileData((prev)=>({...prev,address:{...prev.address,line2:e.target.value}}))} value={profileData.address.line2}/> : profileData.address.line2} <br />
            </p>
          </div>
          <div className='flex gap-1 pt-2'>
            <input onChange={()=> isEdit && setProfileData((prev)=>({...prev,available:!prev.available}))} checked={profileData.available} type='checkbox' readOnly />
            <label>Available</label>
          </div>
          {isEdit ? (
            <button
              onClick={updateProfile}
              className='hover:bg-primary hover:text-white transition-all text-sm border border-primary px-4 py-1 rounded-full mt-5'
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className='hover:bg-primary hover:text-white transition-all text-sm border border-primary px-4 py-1 rounded-full mt-5'
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  )
}

export default PsychiatristProfile
