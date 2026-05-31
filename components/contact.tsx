import React from 'react'
import Navbar from './navbar'
import HerobarContact from './herobarcontact'
import ContactForm from './contactform'
import Footer from './footer'
import ContactLocations from './contactlocations'
import ContactCTA from './contactcta'

const contact = () => {
  return (
    <div className="bg-[#11122F]">
        <Navbar />
        <HerobarContact />
        <ContactForm />
        <ContactLocations />
        <ContactCTA />
        <Footer />
    </div>
  )
}

export default contact
