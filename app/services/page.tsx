import ServiceCard from '../components/ServiceCard'
import { Heart, Clock, Calendar, Users, Star } from 'lucide-react'

export default function ServicesPage() {
    const services = [
        {
            title: "Bridal Mehndi",
            description: "Our signature service. We create bespoke bridal designs that tell your unique love story. Includes consultation and trial.",
            icon: Heart
        },
        {
            title: "Guest & Party Henna",
            description: "Beautiful and quick designs for your guests at weddings, sangeets, and parties. Hourly rates available.",
            icon: Users
        },
        {
            title: "Festivals",
            description: "Celebrate Karwa Chauth, Eid, Diwali and other festivals with traditional and intricate henna patterns. Pre-booking recommended.",
            icon: Calendar
        },
        {
            title: "Private Sessions",
            description: "Book a private appointment for a personalized henna experience at your convenience.",
            icon: Clock
        },
        {
            title: "Events & Corporate",
            description: "Add a touch of culture to your corporate events or product launches with our henna artists.",
            icon: Star
        },
    ]

    return (
        <div className="bg-stone-50 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6 text-center">Our Services</h1>
                <p className="text-stone-600 text-center max-w-2xl mx-auto mb-16">
                    We offer a range of professional henna services tailored to your needs.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </div>
        </div>
    )
}
