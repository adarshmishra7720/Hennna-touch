"use client"

import { Phone, Calendar } from 'lucide-react'
import { trackInteraction } from '../actions'

export default function StickyCTA() {
    const handleWhatsAppClick = async () => {
        // 1. Track the click
        await trackInteraction('whatsapp_click')

        // 2. Open WhatsApp (Replace with actual number)
        window.open('https://wa.me/919876543210?text=Hi,%20I%20am%20interested%20in%20your%20Henna%20services', '_blank')
    }

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact-form')
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/80 backdrop-blur-md border-t border-stone-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden">
            <div className="flex gap-4 max-w-md mx-auto">
                <button
                    onClick={scrollToContact}
                    className="flex-1 flex items-center justify-center gap-2 bg-stone-900 text-white py-3 rounded-xl font-medium shadow-md active:scale-95 transition-transform"
                >
                    <Calendar size={20} />
                    Book Now
                </button>
                <button
                    onClick={handleWhatsAppClick}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-medium shadow-md active:scale-95 transition-transform"
                >
                    <Phone size={20} />
                    WhatsApp
                </button>
            </div>
        </div>
    )
}
