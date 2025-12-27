import Link from 'next/link'
import { Instagram, Facebook, Mail } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-stone-900 text-stone-200">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-8 md:mb-0">
                        <Link href="/" className="font-serif text-2xl text-white">
                            Henna Touch
                        </Link>
                        <p className="mt-2 text-stone-400">Exquisite Mehndi Artistry</p>
                    </div>

                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-white transition-colors">
                            <Instagram size={24} />
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            <Facebook size={24} />
                        </a>
                        <a href="mailto:contact@hennatouch.com" className="hover:text-white transition-colors">
                            <Mail size={24} />
                        </a>
                    </div>
                </div>
                <div className="mt-8 border-t border-stone-800 pt-8 text-center text-sm text-stone-500">
                    &copy; {new Date().getFullYear()} Henna Touch. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
