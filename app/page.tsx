import React from 'react'
import Navbar from '../shared-component/navbar/header'
import Hero from "../page-layout/home/hero-section/hero"
import HajjPakage from "../page-layout/home/hajj-Packages/hajj"
import UmrahPakage from "../page-layout/home/umrah-Packages/umrah"
import DomesticPakage from "../page-layout/home/domestic-packages/domestic"
import InternationalTours from "../page-layout/home/International-tours/international"
import Footer from "../shared-component/footer/footer"
import ChooseUsSection from "../page-layout/home/why-choose-us/why-choose-us"
import Experience from "../page-layout/home/travel-expercience/travel"
import Umrah from "../page-layout/home/umrah-services/umrah"
import Pilgrimage from '../page-layout/home/customize-pilgrimage-experience/customize-pilgrimage-experience'
import PeopleSection from '../page-layout/home/What-People-Say/people'


const page = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <HajjPakage/>
    <UmrahPakage/>
    <DomesticPakage/>
    <InternationalTours/>
    <ChooseUsSection/>
    <Experience/>
    <Umrah/>
    <Pilgrimage/>
    <PeopleSection/>
    <Footer/>
   
    </>
  )
}

export default page