import { LucideIcon } from 'lucide-react'

interface ServiceCardProps {
    title: string
    description: string
    icon: LucideIcon
}

export default function ServiceCard({ title, description, icon: Icon }: ServiceCardProps) {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-default">
            <div className="h-12 w-12 bg-stone-100 rounded-xl flex items-center justify-center mb-6 text-stone-900">
                <Icon size={24} />
            </div>
            <h3 className="font-serif text-xl text-stone-900 mb-3">{title}</h3>
            <p className="text-stone-600 leading-relaxed">
                {description}
            </p>
        </div>
    )
}
