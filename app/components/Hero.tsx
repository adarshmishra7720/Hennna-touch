"use client"

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'

export default function Hero() {
    return (
        <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                {/* 
                   Video Background Capability:
                   If you have a video, uncomment the video tag below and comment out the Image.
                   For now, we use the image as the placeholder.
                */}
                {/* <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                    <source src="/hero-video.mp4" type="video/mp4" />
                </video> */}

                <Image
                    src="/hero.jpg"
                    alt="Intricate Henna Design in Bangalore"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="font-serif text-5xl md:text-8xl text-white mb-6 tracking-tight">
                        Henna Touch
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-stone-200 mb-8 font-light tracking-wide text-lg md:text-xl">
                        <MapPin size={18} className="text-stone-300" />
                        <span>Serving Bangalore, Whitefield, Indiranagar</span>
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-stone-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
                >
                    Timeless artistry for the modern bride.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-stone-900 rounded-full font-medium text-lg hover:bg-stone-100 transition-all transform hover:scale-105"
                    >
                        Book Appointment
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link
                        href="/portfolio"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-full font-medium text-lg hover:bg-white/20 transition-all"
                    >
                        View Portfolio
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}
