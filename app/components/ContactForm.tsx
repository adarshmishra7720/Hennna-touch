"use client"

import { useState } from 'react'
import { submitLead } from '../actions'


export default function ContactForm() {
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)

        // Use the Server Action
        const result = await submitLead(formData)

        setLoading(false)

        if (result.success) {
            setStatus('success')
        } else {
            console.error('Error submitting form:', result.error)
            setStatus('error')
        }
    }

    if (status === 'success') {
        return (
            <div className="bg-green-50 p-6 rounded-xl text-center">
                <h3 className="text-green-800 font-medium text-xl mb-2">Thank you!</h3>
                <p className="text-green-600">We have received your message and will get back to you shortly.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 text-green-700 underline hover:text-green-800"
                >
                    Send another message
                </button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 bg-stone-50 px-4 py-2"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-stone-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 bg-stone-50 px-4 py-2"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-stone-700">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 bg-stone-50 px-4 py-2"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="event_date" className="block text-sm font-medium text-stone-700">Event Date (Optional)</label>
                <input
                    type="date"
                    name="event_date"
                    id="event_date"
                    className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 bg-stone-50 px-4 py-2"
                />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700">Message</label>
                <textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 bg-stone-50 px-4 py-2"
                />
            </div>
            <div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 disabled:opacity-50 transition-colors"
                >
                    {loading ? 'Sending...' : 'Send Message'}
                </button>
            </div>
            {status === 'error' && (
                <p className="text-red-600 text-sm text-center">Something went wrong. Please try again. Ensure Supabase is configured.</p>
            )}
        </form>
    )
}
