"use client"

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { getAdminData, deleteImage } from '../actions'
import { Users, MousePointerClick, Calendar, Upload, Loader2, Image as ImageIcon, Trash2, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Define types
interface Lead {
    id: string
    created_at: string
    name: string
    email: string
    phone: string
    message: string
    event_date: string | null
    location: string | null
}

interface Interaction {
    id: string
    type: string
    created_at: string
}

interface PortfolioItem {
    id: string
    title: string | null
    image_url: string
    category: string | null
}

interface DailyStats {
    date: string
    whatsapp: number
    call: number
    leads: number
}

export default function AdminDashboard() {
    const [leads, setLeads] = useState<Lead[]>([])
    const [interactions, setInteractions] = useState<Interaction[]>([])
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [uploadMessage, setUploadMessage] = useState('')
    const [fetchError, setFetchError] = useState<string | null>(null)
    const [chartData, setChartData] = useState<DailyStats[]>([])
    const [timeRange, setTimeRange] = useState(7)

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        setLoading(true)
        setFetchError(null)
        try {
            const result = await getAdminData()
            if (result.success) {
                setLeads(result.leads || [])
                setInteractions(result.interactions || [])
                setPortfolio(result.portfolio || [])
                processChartData(result.interactions || [], result.leads || [], 7)
            } else {
                console.error('Error fetching data:', result.error)
                setFetchError(result.error)
            }
        } catch (err) {
            console.error('Failed to fetch admin data', err)
            setFetchError('Failed to connect to server')
        }
        setLoading(false)
    }

    const processChartData = (data: Interaction[], leadsData: Lead[], days: number) => {
        const chartStats: DailyStats[] = []
        for (let i = days - 1; i >= 0; i--) {
            const d = new Date()
            d.setDate(d.getDate() - i)
            const dateStr = d.toLocaleDateString("en-US", { month: 'short', day: 'numeric' })

            // Filter interactions for this day
            const dayInteractions = data.filter(item => {
                if (!item.created_at) return false
                return new Date(item.created_at).toDateString() === d.toDateString()
            })

            // Filter leads for this day
            const dayLeads = leadsData.filter(lead => {
                return new Date(lead.created_at).toDateString() === d.toDateString()
            })

            chartStats.push({
                date: dateStr,
                whatsapp: dayInteractions.filter(x => x.type === 'whatsapp_click').length,
                call: dayInteractions.filter(x => x.type === 'call_click').length,
                leads: dayLeads.length
            })
        }
        setChartData(chartStats)
    }

    const handleTimeRangeChange = (days: number) => {
        setTimeRange(days)
        processChartData(interactions, leads, days)
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        window.location.href = '/admin/upload'
    }

    const handleDeleteImage = async (id: string, imageUrl: string) => {
        if (!confirm('Are you sure you want to delete this image?')) return
        setPortfolio(prev => prev.filter(item => item.id !== id))
        try {
            const result = await deleteImage(id, imageUrl)
            if (!result.success) {
                alert('Error deleting image: ' + result.error)
                fetchData() // Revert
            }
        } catch (error: any) {
            console.error('Error deleting image:', error)
            alert('Error deleting image')
            fetchData()
        }
    }

    // Stats calculations
    const today = new Date().toDateString()
    const todayInteractions = interactions.filter(i => i.created_at && new Date(i.created_at).toDateString() === today)
    const todayLeads = leads.filter(l => new Date(l.created_at).toDateString() === today).length

    const whatsappTotal = interactions.filter(i => i.type === 'whatsapp_click').length
    const callTotal = interactions.filter(i => i.type === 'call_click').length

    const whatsappToday = todayInteractions.filter(i => i.type === 'whatsapp_click').length
    const callToday = todayInteractions.filter(i => i.type === 'call_click').length

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-10 h-10 animate-spin text-stone-400" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-stone-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-stone-900">Admin Dashboard</h1>
                    <a href="/" className="text-stone-500 hover:text-stone-900 text-sm">View Site &rarr;</a>
                </div>

                {fetchError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start">
                        <div className="flex-1">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{fetchError}</span>
                            {fetchError.includes('Missing Admin Key') && (
                                <p className="text-sm mt-1 text-red-600">
                                    Check your <code>.env.local</code> file and ensure <code>SUPABASE_SERVICE_ROLE_KEY</code> is set correctly.
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* --- ANALYTICS SECTION --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Today's Stats */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 lg:col-span-1">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-stone-500 text-sm font-medium">Activity Today</h3>
                                <p className="text-xs text-stone-400">Resets daily at midnight</p>
                            </div>
                            <div className="p-2 bg-green-50 rounded-lg text-green-600">
                                <TrendingUp size={20} />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-stone-600">Leads (Forms)</span>
                                <span className="text-2xl font-bold text-stone-900">{todayLeads}</span>
                            </div>
                            <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-purple-500 h-full" style={{ width: `${(todayLeads / 10) * 100}%` }}></div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-stone-600">WhatsApp Clicks</span>
                                <span className="text-2xl font-bold text-stone-900">{whatsappToday}</span>
                            </div>
                            <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full" style={{ width: `${(whatsappToday / (whatsappToday + callToday || 1)) * 100}%` }}></div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-stone-600">Call Clicks</span>
                                <span className="text-2xl font-bold text-stone-900">{callToday}</span>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-stone-100">
                            <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Lifetime Totals</h4>
                            <div className="flex justify-between text-sm">
                                <span className="text-stone-600">Total WhatsApp: <span className="font-medium text-stone-900">{whatsappTotal}</span></span>
                                <span className="text-stone-600">Total Calls: <span className="font-medium text-stone-900">{callTotal}</span></span>
                            </div>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-stone-500 text-sm font-medium">Traffic History</h3>
                            <div className="flex bg-stone-100 p-1 rounded-lg">
                                <button
                                    onClick={() => handleTimeRangeChange(7)}
                                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${timeRange === 7 ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-900'}`}
                                >
                                    7 Days
                                </button>
                                <button
                                    onClick={() => handleTimeRangeChange(30)}
                                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${timeRange === 30 ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-900'}`}
                                >
                                    30 Days
                                </button>
                            </div>
                        </div>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E4" />
                                    <XAxis
                                        dataKey="date"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#78716c', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#78716c', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f5f5f4' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend iconType="circle" />
                                    <Bar dataKey="leads" name="Leads" fill="#a855f7" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="whatsapp" name="WhatsApp" fill="#22c55e" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="call" name="Calls" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Portfolio Management */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 md:col-span-3">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-stone-900">Portfolio Gallery</h3>
                                <p className="text-sm text-stone-500">{portfolio.length} images currently live</p>
                            </div>
                            <a href="/admin/upload" className="bg-stone-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-stone-800 transition-colors flex items-center gap-2">
                                <Upload size={16} /> Upload New
                            </a>
                        </div>

                        {portfolio.length === 0 ? (
                            <div className="text-center py-10 bg-stone-50 rounded-lg border border-dashed border-stone-200">
                                <ImageIcon className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                                <p className="text-stone-500">No images uploaded yet.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {portfolio.map((item) => (
                                    <div key={item.id} className="group relative aspect-square bg-stone-100 rounded-lg overflow-hidden border border-stone-200">
                                        <img
                                            src={item.image_url}
                                            alt={item.title || 'Portfolio'}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => handleDeleteImage(item.id, item.image_url)}
                                                className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors shadow-lg"
                                                title="Delete Image"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Leads Table */}
                <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-stone-100 flex items-center gap-2">
                        <Users size={20} className="text-stone-400" />
                        <h2 className="text-lg font-bold text-stone-900">Recent Inquiries</h2>
                        <span className="bg-stone-100 text-stone-600 text-xs px-2 py-1 rounded-full">{leads.length} Total</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-stone-200">
                            <thead className="bg-stone-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Message</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-stone-200">
                                {leads.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-stone-500">
                                            No inquiries yet.
                                        </td>
                                    </tr>
                                ) : (
                                    leads.map((lead) => (
                                        <tr key={lead.id} className="hover:bg-stone-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                                                {new Date(lead.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-900">
                                                {lead.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                                                {lead.location || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                                                <div className="text-stone-900">{lead.phone}</div>
                                                <div className="text-xs text-stone-400">{lead.email}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-stone-500 max-w-xs truncate">
                                                {lead.message}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
