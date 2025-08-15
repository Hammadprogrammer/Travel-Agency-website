import React from 'react'
import Navbar from '../shared-component/navbar/header'
import Hero from "../page-layout/home/hero-section/hero"
import HajjPakage from "../page-layout/home/hajj-Packages/hajj"
import UmrahPakage from "../page-layout/home/umrah-Packages/umrah"
import DomesticPakage from "../page-layout/home/domestic-packages/domestic"

const page = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <HajjPakage/>
    <UmrahPakage/>
    <DomesticPakage/>
    </>
  )
}

export default page