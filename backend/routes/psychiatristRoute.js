import express from 'express'
import {
  psychiatristList,
  loginPsychiatrist,
  appintmentsPsychiatrist,
  appointmentCancel,
  appointmentComplete,
  psychiatristProfile,
  updatePsychiatristProfile,
  psychiatristDashboard,
  createMeeting
} from '../controllers/psychiatristController.js'
import authPsychiatrist from '../middlewares/authPsychiatrist.js'

const psychiatristRouter = express.Router()

psychiatristRouter.get('/list', psychiatristList)
psychiatristRouter.post('/login', loginPsychiatrist)
psychiatristRouter.get('/appointments', authPsychiatrist, appintmentsPsychiatrist)
psychiatristRouter.post('/complete-appointment', authPsychiatrist, appointmentComplete)
psychiatristRouter.post('/cancel-appointment', authPsychiatrist, appointmentCancel)
psychiatristRouter.get('/dashboard', authPsychiatrist, psychiatristDashboard)
psychiatristRouter.get('/profile', authPsychiatrist, psychiatristProfile)
psychiatristRouter.post('/update-profile', authPsychiatrist, updatePsychiatristProfile)

// New route for Jitsi meeting creation
psychiatristRouter.post('/create-meeting', authPsychiatrist, createMeeting)

export default psychiatristRouter
