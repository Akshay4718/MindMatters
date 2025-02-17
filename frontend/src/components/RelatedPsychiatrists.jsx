import React, { useEffect,useContext,useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
const RelatedPsychiatrists = ({psyId,speciality}) => {
    const {psychiatrist} = useContext(AppContext)
    const [relPsy, setRelPsy] = useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        if(psychiatrist.length>0 && speciality){
            const psychiatristsData=psychiatrist.filter(psy=>psy.speciality===speciality && psy._id!==psyId)
            setRelPsy(psychiatristsData)
        }
    },[psychiatrist,speciality,psyId])
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Psychiatrists to Book</h1>
        <p className='sm:w-1/3 text-center text-sm'>Choose our Psychiatrists for Consultation.</p>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {
                relPsy.slice(0,5).map((item,index)=>(
                    <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}} key={index} className='border border-black-400 rounded-xl overflow-hidden cursor-pointer hover:scale-105'>
                        <img className='bg-gray-50' src={item.image} alt="" />
                        <div className='p-4'>
                        <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                                <p className={`w-2 h-2 ${item.available?'bg-green-500':'bg-red-500'} rounded-full`}></p><p className={` ${item.available?'text-green-500':'text-red-500'} rounded-full`}>{item.available?'Available':'Not Available'}</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{item.name}</p> 
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))
            }
        </div>
        <button onClick={()=>{navigate('/psychiatrist');scrollTo(0,0)}} className='bg-gray-200 text-gray-600 px-12 py-3 rounded-full mt-10'>more</button>
    </div>
  )
}

export default RelatedPsychiatrists