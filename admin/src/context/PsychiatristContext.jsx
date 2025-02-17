import { useState, createContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export const PsychiatristContext = createContext()

const PsychiatristContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [pToken, setPToken] = useState(localStorage.getItem('pToken') || '')
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/psychiatrist/appointments', {
                headers: { ptoken: pToken }
            })
            if (data.success) {
                setAppointments(data.appointments.reverse())
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/psychiatrist/complete-appointment',
                { appointmentId },
                { headers: { ptoken: pToken } }
            )
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/psychiatrist/cancel-appointment',
                { appointmentId },
                { headers: { ptoken: pToken } }
            )
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/psychiatrist/dashboard', {
                headers: { ptoken: pToken }
            })
            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const getProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/psychiatrist/profile', {
                headers: { ptoken: pToken }
            })
            if (data.success) {
                setProfileData(data.profileData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const value = {
        pToken,
        setPToken,
        backendUrl,
        appointments,
        setAppointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
        dashData,
        getDashData,
        setDashData,
        profileData,
        getProfileData,
        setProfileData
    }

    return (
        <PsychiatristContext.Provider value={value}>
            {props.children}
        </PsychiatristContext.Provider>
    )
}

export default PsychiatristContextProvider
