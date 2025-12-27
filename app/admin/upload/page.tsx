"use client"

import { useState } from 'react'
import { uploadImage } from '../../actions'
import { Upload, X, Loader2 } from 'lucide-react'
import Image from 'next/image'

export default function UploadPage() {
    const [uploading, setUploading] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const f = e.target.files[0]
            setFile(f)
            setPreview(URL.createObjectURL(f))
        }
    }

    const handleUpload = async () => {
        if (!file) return

        setUploading(true)
        try {
            const formData = new FormData()
            formData.append('file', file)

            const result = await uploadImage(formData)

            if (!result.success) {
                throw new Error(result.error)
            }

            alert('Image uploaded successfully!')
            setFile(null)
            setPreview(null)
        } catch (error: any) {
            console.error('Error uploading image:', error)
            alert('Error uploading image: ' + error.message)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-stone-900 mb-6">Upload Portfolio Image</h1>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100">
                <div className="border-2 border-dashed border-stone-300 rounded-lg p-12 text-center hover:bg-stone-50 transition-colors relative">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />

                    {preview ? (
                        <div className="relative h-64 w-full">
                            <Image src={preview} alt="Preview" fill className="object-contain" />
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    setFile(null)
                                    setPreview(null)
                                }}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full z-10"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ) : (
                        <div className="pointer-events-none">
                            <Upload className="mx-auto h-12 w-12 text-stone-400" />
                            <p className="mt-2 text-sm text-stone-600">Click or drag and drop to upload</p>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 disabled:opacity-50"
                >
                    {uploading ? (
                        <Loader2 className="animate-spin w-5 h-5" />
                    ) : (
                        'Upload to Gallery'
                    )}
                </button>
            </div>
        </div>
    )
}
