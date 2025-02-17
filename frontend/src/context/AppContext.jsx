import { createContext, useEffect, useState } from "react"
import axios from 'axios'
import { toast } from 'react-toastify'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [psychiatrist, setPsychiatrist] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') || false)
    const [userData, setUserData] = useState(false)

    const getPsychiatristData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/psychiatrist/list')
            if (data.success) {
                setPsychiatrist(data.psychiatrist)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', {
                headers: { token }
            })
            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Example helper: slotDate -> "DD_MM_YYYY" -> "DD Month YYYY"
    const slotDateFormat = (slotDate) => {
        if (!slotDate) return ''
        const [d, m, y] = slotDate.split('_')
        const months = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        return `${d} ${months[+m]} ${y}`
    }

    // Example: calculateAge(dob)
    const calculateAge = (dobString) => {
        if (!dobString || dobString === 'Not Selected') return '-'
        const birthDate = new Date(dobString)
        if (isNaN(birthDate.getTime())) return '-'
        const today = new Date()
        let age = today.getFullYear() - birthDate.getFullYear()
        const m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        return age
    }

    useEffect(() => {
        getPsychiatristData()
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token])

    const value = {
        psychiatrist,
        getPsychiatristData,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData,
        slotDateFormat,
        calculateAge
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
