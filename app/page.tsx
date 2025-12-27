import Hero from './components/Hero'
import Gallery from './components/Gallery'
import ServiceCard from './components/ServiceCard'
import StickyCTA from './components/StickyCTA'
import { Sparkles, Heart } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="pb-100 md:pb-0"> {/* Padding bottom for mobile sticky bar */}
      <Hero />

      {/* Introduction / Highlights */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-6">Experience the Art of Henna</h2>
        <p className="text-stone-600 max-w-3xl mx-auto text-lg leading-relaxed mb-12">
          From traditional bridal patterns to contemporary designs, Henna Touch brings your vision to life with precision and passion. We use only natural, organic henna for rich, long-lasting color.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <ServiceCard
            title="Bridal Mehndi"
            description="Intricate and traditional designs for your special day, covering hands, arms, and feet with storytelling patterns."
            icon={Heart}
          />
          <ServiceCard
            title="Party Henna"
            description="Elegant and stylish designs for guests, festivals, and special occasions. Quick yet beautiful applications."
            icon={Sparkles}
          />
          <ServiceCard
            title="Private Appointments"
            description="Relaxed, one-on-one sessions in the comfort of your home or our studio. Perfect for trial runs or personal pampering."
            icon={Heart}
          />
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 bg-stone-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-2">Latest Creations</h2>
              <p className="text-stone-600">A glimpse into our portfolio</p>
            </div>
            <Link href="/portfolio" className="text-stone-900 hover:text-stone-600 font-medium transition-colors hidden sm:block">
              View All Works &rarr;
            </Link>
          </div>

          <Gallery />

          <div className="mt-8 text-center sm:hidden">
            <Link href="/portfolio" className="text-stone-900 font-medium hover:underline">
              View All Works &rarr;
            </Link>
          </div>
        </div>
      </section>

      <StickyCTA />
    </main>
  )
}
