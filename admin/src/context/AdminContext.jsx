import { useState } from 'react'
import {createContext} from 'react'
import axios from 'axios'
export const AdminContext=createContext()
import {toast} from 'react-toastify'
const AdminContextProvider=(props)=>{

    const [aToken,setAToken]=useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    const [psychiatrist,setPsychiatrist]=useState([])
    const [appointments,setAppointments]=useState([])
    const [dashData,setDashData] = useState(false)
    
    const backendUrl=import.meta.env.VITE_BACKEND_URL

    const getAllPsychiatrist=async()=>{
        try{
            const {data}=await axios.post(backendUrl+'/api/admin/all-psychiatrist',{},{headers:{aToken}})
            if(data.success){
                setPsychiatrist(data.psychiatrist)
                console.log(data.psychiatrist)
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    const changeAvailability=async (psyId)=>{
        try{
            const {data}=await axios.post(backendUrl+'/api/admin/change-availability',{psyId},{headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllPsychiatrist()
            }else{
                toast.error(error.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    const getAllAppointments=async()=>{
        try {
            const {data}=await axios.get(backendUrl+'/api/admin/appointments',{headers:{aToken}})
            if(data.success){
                setAppointments(data.appointments)
                console.log(data.appointments)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancelAppointment=async(appointmentId)=>{
        try {
            const {data}=await axios.post(backendUrl+'/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllAppointments()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getDashData = async()=>{
        try{
            const {data} = await axios.get(backendUrl+'/api/admin/dashboard',{headers:{aToken}}
            )
            if(data.success){
                setDashData(data.dashData)
                console.log(data.dashData)
            }else{
                toast.error(data.message)
            }
        }
        catch(error){
            toast.error(error.message)
        }
    }   

    const value={
        aToken,setAToken,backendUrl,psychiatrist,getAllPsychiatrist,changeAvailability,appointments,setAppointments,getAllAppointments,cancelAppointment,dashData,getDashData
    }
    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider