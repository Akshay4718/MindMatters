import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import { PsychiatristContext } from '../context/PsychiatristContext'

const Login = () => {

  const [state,setState]=useState('Admin')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {setAToken,backendUrl}=useContext(AdminContext)
  const {setPToken} = useContext(PsychiatristContext)


  const onSubmitHandler=async(event)=>{
    event.preventDefault();
    try{
      if(state==='Admin'){
        const {data}=await axios.post(backendUrl + '/api/admin/login',{email,password})
        if(data.success){
          localStorage.setItem('aToken',data.token)
          setAToken(data.token)
          
        }else{
          toast.error(data.message)
        }
      }else{
        const {data}=await axios.post(backendUrl + '/api/psychiatrist/login',{email,password})
        if(data.success){
          localStorage.setItem('pToken',data.token)
          setPToken(data.token)
          console.log(data.token);

          
        }else{
          toast.error(data.message)
        }

      }

    }catch(error){

    }
    
  }


  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-primary text-sm shadow-lg'>
        <p className='text-2xl m-auto font-semibold'><span className='text-primary'>{state}</span>     Login</p>
        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
        {
          state==='Admin'?<p>Psychiatrist Login? <span className='text-primary cursor-pointer underline' onClick={()=>setState('Psychiatrist')}>Click here</span></p>:
          <p>Admin Login? <span className='text-primary cursor-pointer underline' onClick={()=>setState('Admin')}>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login