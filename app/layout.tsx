import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  metadataBase: new URL('https://hennatouch.com'),
  title: {
    default: 'Henna Touch | Exquisite Mehndi Artistry in Bangalore',
    template: '%s | Henna Touch',
  },
  description: 'Professional Mehndi Artist in Bangalore (Whitefield, Indiranagar). Specializing in intricate Bridal Mehndi, Party Henna, and contemporary designs using organic henna.',
  keywords: ['Mehndi Artist Bangalore', 'Bridal Henna Whitefield', 'Henna Indiranagar', 'Organic Henna', 'Mehndi Services'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://hennatouch.com',
    title: 'Henna Touch | Exquisite Mehndi Artistry',
    description: 'Professional Mehndi Artist in Bangalore specializing in bridal and intricate henna designs.',
    siteName: 'Henna Touch',
    images: [
      {
        url: '/hero.jpg', // Ensure this exists in public folder
        width: 1200,
        height: 630,
        alt: 'Henna Touch - Intricate Mehndi Designs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Henna Touch | Exquisite Mehndi Artistry',
    description: 'Professional Mehndi Artist in Bangalore. Book your bridal or party henna today!',
    images: ['/hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness', // or BeautySalon / ProfessionalService
    name: 'Henna Touch',
    image: 'https://hennatouch.com/hero.jpg',
    description: 'Professional Mehndi Artist in Bangalore specializing in bridal and intricate henna designs.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bangalore',
      addressRegion: 'Karnataka',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '12.9716', // Approximate Bangalore coords
      longitude: '77.5946'
    },
    url: 'https://hennatouch.com',
    telephone: '+919876543210', // Replace with actual
    priceRange: '₹₹',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '20:00'
      }
    ]
  }

  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-stone-50 text-stone-900`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <div className="pt-16">
          {children}
        </div>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
