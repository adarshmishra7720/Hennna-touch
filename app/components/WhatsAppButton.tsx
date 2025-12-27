"use client"

import { MessageCircle } from 'lucide-react'
import { trackInteraction } from '../actions'

export default function WhatsAppButton() {
    const handleWhatsAppClick = async () => {
        try {
            // Track the interaction
            await trackInteraction('whatsapp_click')
        } catch (error) {
            console.error('Tracking failed:', error)
        } finally {
            // Redirect to WhatsApp regardless of tracking success
            // Using the phone number found in contact page: +91 123 456 7890
            window.location.href = 'https://wa.me/911234567890?text=Hi!%20I%20would%20like%20to%20book%20an%20appointment.'
        }
    }

    return (
        <button
            onClick={handleWhatsAppClick}
            className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={32} />
        </button>
    )
}
