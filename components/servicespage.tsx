import React from 'react'
import Navbar from './navbar'
import Evaluate from './evaluatcta'
import Brandsspec from './brandsspec'
import Footer from './footer'
import ServicesDetail from './servicesdetail'
import Herobarserv from './herobarserv'

const Servicespage = () => {
  return (
    <div className="bg-[#11122F] ">
      <Navbar />
      <Herobarserv />
      <ServicesDetail />
      <Evaluate />
      <Brandsspec />
      <Footer />
    </div>
  )
}

export default Servicespage
