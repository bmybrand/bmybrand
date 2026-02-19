import React from 'react'
import Navbar from './Navbar'
import HerobarContact from './herobarcontact'
import ContactForm from './contactform'
import Footer from './Footer'
import ContactLocations from './ContactLocations'
import ContactCTA from './ContactCTA'

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