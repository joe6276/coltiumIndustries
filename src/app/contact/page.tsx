import React from 'react'
import ContactHero from '@/components/contact/ContactHero'
import ContactForm from '@/components/contact/ContactForm'
import ContactMap from '@/components/contact/ContactMap'

export const metadata = {
  title: 'Contact Us | Coltium Industries',
  description: 'Get in touch with Coltium Industries for inquiries about our technology solutions and partnerships.',
  keywords: 'contact Coltium, tech inquiries, partnership requests, technology consultation',
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactMap />
          </div>
        </div>
      </div>
    </>
  )
}