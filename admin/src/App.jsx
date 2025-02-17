import React from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar'
import {Route,Routes} from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard';
import AllAppointment from './pages/Admin/AllAppointment'
import AddPsychiatrist from './pages/Admin/AddPsychiatrist';
import PsychiatristList from './pages/Admin/PsychiatristList';
import { PsychiatristContext } from './context/PsychiatristContext';
import PsychiatristDashboard from './pages/Psychiatrist/PsychiatristDashboard';
import PsychiatristAppointments from './pages/Psychiatrist/PsychiatristAppointments'
import PsychiatristProfile from './pages/Psychiatrist/PsychiatristProfile';
const App = () => {

  const {aToken}=useContext(AdminContext)
  const {pToken}=useContext(PsychiatristContext)

  return aToken || pToken? (
    <div className='bg-[#F8F9FD]' >
      <ToastContainer/>
      <Navbar/>
      <div className='flex item-start'>
        <Sidebar/>
        <Routes>
          {/*Admin Route */}
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/all-appointments' element={<AllAppointment/>}/>
          <Route path='/add-psychiatrist' element={<AddPsychiatrist/>}/>
          <Route path='/psychiatrist-list' element={<PsychiatristList/>}/>
          {/*Psychiatrist route*/}
          <Route path='/psychiatrist-dashboard' element={<PsychiatristDashboard/>}/>
          <Route path='/psychiatrist-appointments' element={<PsychiatristAppointments/>}/>
          <Route path='/psychiatrist-profile' element={<PsychiatristProfile/>}/>
        </Routes>
      </div>
    </div>
  ):(
    <>
      <Login/>
      <ToastContainer/>
    </>
  )
}

export default App