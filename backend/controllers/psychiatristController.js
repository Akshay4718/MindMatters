import psychiatristModel from '../models/psychiatristModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'

// Toggle availability
const changeAvailability = async (req, res) => {
    try {
        const { psyId } = req.body
        const psyData = await psychiatristModel.findById(psyId)
        await psychiatristModel.findByIdAndUpdate(psyId, { available: !psyData.available })
        res.json({ success: true, message: 'availability changed' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// List psychiatrists
const psychiatristList = async (req, res) => {
    try {
        const psychiatrist = await psychiatristModel.find({}).select(['-password', '-email'])
        res.json({ success: true, psychiatrist })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Psy login
const loginPsychiatrist = async (req, res) => {
    try {
        const { email, password } = req.body
        const psychiatrist = await psychiatristModel.findOne({ email })
        if (!psychiatrist) {
            return res.json({ success: false, message: "Invalid credentials" })
        }
        const isMatch = await bcrypt.compare(password, psychiatrist.password)
        if (isMatch) {
            const token = jwt.sign({ id: psychiatrist._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credential" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Get appointments for psychiatrist
const appintmentsPsychiatrist = async (req, res) => {
    try {
        const { psyId } = req.body
        const appointments = await appointmentModel.find({ psyId })
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Mark appointment completed
const appointmentComplete = async (req, res) => {
    try {
        const { psyId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.psyId == psyId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: 'Appointment completed' })
        } else {
            return res.json({ success: true, message: 'mark failed' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Cancel appointment
const appointmentCancel = async (req, res) => {
    try {
        const { psyId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.psyId == psyId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: 'Appointment cancelled' })
        } else {
            return res.json({ success: true, message: 'cancellation failed' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Psychiatrist dashboard
const psychiatristDashboard = async (req, res) => {
    try {
        const { psyId } = req.body
        const appointments = await appointmentModel.find({ psyId })
        let earnings = 0
        appointments.forEach((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })
        let patients = []
        appointments.forEach((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })
        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }
        res.json({ success: true, dashData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Psychiatrist profile
const psychiatristProfile = async (req, res) => {
    try {
        const { psyId } = req.body
        const profileData = await psychiatristModel.findById(psyId).select('-password')
        res.json({ success: true, profileData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Update psychiatrist profile
const updatePsychiatristProfile = async (req, res) => {
    try {
        const { psyId, fees, address, available } = req.body
        await psychiatristModel.findByIdAndUpdate(psyId, { fees, address, available })
        res.json({ success: true, message: 'profile updated' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// NEW: Create Jitsi meeting link
const createMeeting = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointment = await appointmentModel.findById(appointmentId)
        if (!appointment) {
            return res.json({ success: false, message: 'Appointment not found' })
        }
        if (appointment.psyId !== req.body.psyId) {
            return res.json({ success: false, message: 'Unauthorized' })
        }
        if (!appointment.onlineMode) {
            return res.json({ success: false, message: 'Not an online appointment' })
        }
        const randomRoom = 'Psychiatrist Consulting-' + Math.random().toString(36).substring(2, 8)
        const meetingLink = `https://meet.jit.si/${randomRoom}`
        appointment.meetingLink = meetingLink
        await appointment.save()
        res.json({ success: true, meetingLink })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    changeAvailability,
    psychiatristList,
    loginPsychiatrist,
    appintmentsPsychiatrist,
    appointmentCancel,
    appointmentComplete,
    psychiatristDashboard,
    psychiatristProfile,
    updatePsychiatristProfile,
    createMeeting
}
