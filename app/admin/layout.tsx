import Link from 'next/link'
import { LayoutDashboard, Users, Image as ImageIcon } from 'lucide-react'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-stone-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md z-10 hidden md:block">
                <div className="h-16 flex items-center justify-center border-b border-stone-200">
                    <span className="font-serif text-xl font-bold text-stone-900">Henna Admin</span>
                </div>
                <nav className="mt-6 px-4 space-y-2">
                    <Link href="/admin" className="flex items-center px-4 py-3 text-stone-600 hover:bg-stone-50 rounded-lg transition-colors">
                        <LayoutDashboard className="w-5 h-5 mr-3" />
                        Dashboard
                    </Link>
                    <Link href="/admin/leads" className="flex items-center px-4 py-3 text-stone-600 hover:bg-stone-50 rounded-lg transition-colors">
                        <Users className="w-5 h-5 mr-3" />
                        Leads
                    </Link>
                    <Link href="/admin/upload" className="flex items-center px-4 py-3 text-stone-600 hover:bg-stone-50 rounded-lg transition-colors">
                        <ImageIcon className="w-5 h-5 mr-3" />
                        Portfolio Upload
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-8">
                {children}
            </main>
        </div>
    )
}
