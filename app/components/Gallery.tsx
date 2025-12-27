"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from '../lib/supabase'
import { X, ZoomIn } from 'lucide-react'

interface PortfolioItem {
    id: string
    title: string | null
    image_url: string
    category: string | null
}

export default function Gallery() {
    const [images, setImages] = useState<PortfolioItem[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null)

    useEffect(() => {
        async function fetchPortfolio() {
            const { data } = await supabase
                .from('portfolio')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(8)

            if (data) {
                setImages(data)
            }
            setLoading(false)
        }
        fetchPortfolio()
    }, [])

    // Lock body scroll when lightbox is open
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [selectedImage])

    if (loading) {
        return <div className="text-center py-10 text-stone-400">Loading gallery...</div>
    }

    if (images.length === 0) {
        return (
            <div className="text-center py-10 text-stone-500 bg-stone-100 rounded-xl">
                <p>No images uploaded yet.</p>
                <p className="text-sm mt-2">Visit /admin to upload your best work!</p>
            </div>
        )
    }

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((img) => (
                    <div
                        key={img.id}
                        className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer bg-stone-200"
                        onClick={() => setSelectedImage(img)}
                    >
                        <Image
                            src={img.image_url}
                            alt={img.title || 'Portfolio Image'}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <span className="text-white text-sm font-medium">{img.title}</span>
                            <div className="absolute top-3 right-3 text-white/0 group-hover:text-white/80 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <ZoomIn size={20} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full z-50"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X size={32} />
                    </button>

                    <div
                        className="relative w-full max-w-5xl h-full max-h-[90vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={selectedImage.image_url}
                                alt={selectedImage.title || 'Full View'}
                                fill
                                className="object-contain"
                                quality={100}
                                priority
                            />
                        </div>
                        {selectedImage.title && (
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/60 text-white rounded-full backdrop-blur-md border border-white/10 text-center max-w-[90%]">
                                <p className="font-medium text-lg">{selectedImage.title}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
