import validator from 'validator'
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import psychiatristModel from '../models/psychiatristModel.js'
import jwt from "jsonwebtoken"
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'
//API for adding doctor
const addPsychiatrist= async (req,res)=>{
    try{
        const {name,email,password,speciality,degree,experience,about,fees,address}=req.body
        const imageFile=req.file

        //checking for all data to add psy
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success:false,message:"Missing Details"})
        }

        // validating email
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter valid email"})
        }

        //validating password

        if(password.length<8){
            return res.json({success:false,message:"Please enter strong password"}) 
        }

        //hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //upload to cloudnary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'})

        const imageUrl = imageUpload.secure_url

        const psychiatristData = {
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newPsychiatrist = new psychiatristModel(psychiatristData)

        await newPsychiatrist.save()

        res.json({success:true,message:"Psychiatrist added"})

    }catch(error){  
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API for admin
const loginAdmin = async(req,res)=>{
    try{

        const {email,password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid credentials"})
        }

    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


//API to get all psy
const allPsychiatrist=async(req,res)=>{
    try{
        const psychiatrist=await psychiatristModel.find({}).select('-password')
        res.json({success:true,psychiatrist})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to get all appointements list 
const appointmentsAdmin = async (req,res)=>{
    try {
        const appointments=await appointmentModel.find({})
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//api to cancel apt
const appointmentCancel = async (req, res) => {
    try {
        const {  appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)


        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // releasing doctor slot
        const { psyId, slotDate, slotTime } = appointmentData
        const psychiatristData = await psychiatristModel.findById(psyId)
        let slots_booked = psychiatristData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
        await psychiatristModel.findByIdAndUpdate(psyId, { slots_booked })

        res.json({ success: true, message: "Appointment Cancelled" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api to dashboaard data for admin panel
const adminDashboard = async(req,res)=>{
    try {
        
        const psychiatrist = await psychiatristModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            psychiatrist:psychiatrist.length,
            appointments:appointments.length,
            patients:users.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }

        res.json({success:true,dashData})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export {addPsychiatrist,loginAdmin,allPsychiatrist,appointmentsAdmin,appointmentCancel,adminDashboard}