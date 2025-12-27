"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from '../lib/supabase'

interface PortfolioItem {
    id: string
    title: string | null
    image_url: string
    category: string | null
}

export default function Gallery() {
    const [images, setImages] = useState<PortfolioItem[]>([])
    const [loading, setLoading] = useState(true)

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img) => (
                <div key={img.id} className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer bg-stone-200">
                    <Image
                        src={img.image_url}
                        alt={img.title || 'Portfolio Image'}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-white text-sm font-medium">{img.title}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
