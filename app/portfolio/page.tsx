import Gallery from '../components/Gallery'

export default function PortfolioPage() {
    return (
        <div className="bg-white min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6 text-center">Our Portfolio</h1>
                <p className="text-stone-600 text-center max-w-2xl mx-auto mb-16">
                    Explore our collection of intricate mehndi designs, from traditional bridal patterns to modern interpretations.
                </p>
                <Gallery />
            </div>
        </div>
    )
}
