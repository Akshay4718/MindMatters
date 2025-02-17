import express from 'express'
import { addPsychiatrist,allPsychiatrist,loginAdmin,appointmentsAdmin, appointmentCancel,adminDashboard } from '../controllers/adminContoller.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/psychiatristController.js'

const adminRouter=express.Router()


adminRouter.post('/add-psychiatrist',authAdmin,upload.single('image'),addPsychiatrist)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-psychiatrist',authAdmin,allPsychiatrist)
adminRouter.post('/change-availability',authAdmin,changeAvailability)
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)
export default adminRouter
