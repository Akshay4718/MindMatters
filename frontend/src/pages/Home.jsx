import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopPsychiatrists from '../components/TopPsychiatrists'
import Banner from '../components/Banner'


const Home = () => {
  return (
    <div>
      <Header/>
      <SpecialityMenu/>
      <TopPsychiatrists/>
      <Banner/>
    </div>
  )
}

export default Home