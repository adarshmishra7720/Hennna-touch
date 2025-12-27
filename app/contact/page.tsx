import ContactForm from '../components/ContactForm'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-stone-50 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">Get in Touch</h1>
                    <p className="text-stone-600 max-w-2xl mx-auto">
                        We'd love to hear from you. Fill out the form below or reach out to us directly.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Contact Info */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm">
                        <h2 className="font-serif text-2xl text-stone-900 mb-8">Contact Information</h2>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <Mail className="w-6 h-6 text-stone-400 mt-1 mr-4" />
                                <div>
                                    <h3 className="font-medium text-stone-900">Email</h3>
                                    <p className="text-stone-600">contact@hennatouch.com</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Phone className="w-6 h-6 text-stone-400 mt-1 mr-4" />
                                <div>
                                    <h3 className="font-medium text-stone-900">Phone</h3>
                                    <p className="text-stone-600">+91 123 456 7890</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="w-6 h-6 text-stone-400 mt-1 mr-4" />
                                <div>
                                    <h3 className="font-medium text-stone-900">Studio</h3>
                                    <p className="text-stone-600">123 Art Avenue, Design District<br />Mumbai, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
