import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Psychiatrist from './pages/Psychiatrist'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/psychiatrist' element={<Psychiatrist/>}  />
        <Route path='/psychiatrist/:speciality' element={<Psychiatrist/>}  />
        <Route path='/login' element={<Login/>}  />
        <Route path='/about' element={<About/>}  />
        <Route path='/contact' element={<Contact/>}  />
        <Route path='/my-profile' element={<MyProfile/>}  />
        <Route path='/my-appointments' element={<MyAppointments/>}  />
        <Route path='/appointment/:psyId' element={<Appointment/>}  />

      </Routes>
      <Footer/>
    </div>
  )
}

export default App