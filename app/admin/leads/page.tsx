"use client"

import { useEffect, useState } from 'react'
import { getAdminData } from '../../actions'
import { Loader2 } from 'lucide-react'

// Define Lead type
interface Lead {
    id: string
    created_at: string
    name: string
    email: string
    phone: string
    message: string
    event_date: string | null
}

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchLeads() {
            setLoading(true)
            try {
                const result = await getAdminData()
                if (result.success) {
                    setLeads(result.leads || [])
                } else {
                    console.error('Error fetching leads:', result.error)
                }
            } catch (err) {
                console.error('Failed to fetch leads', err)
            }
            setLoading(false)
        }

        fetchLeads()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-stone-400" />
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-stone-900 mb-6">Inquiries & Leads</h1>

            <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-stone-200">
                        <thead className="bg-stone-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Event Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Message</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-stone-200">
                            {leads.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-stone-500">
                                        No leads found. Ensure you have created the &apos;leads&apos; table in Supabase.
                                    </td>
                                </tr>
                            ) : (
                                leads.map((lead) => (
                                    <tr key={lead.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                                            {new Date(lead.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-900">
                                            {lead.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                                            <div>{lead.email}</div>
                                            <div className="text-xs text-stone-400">{lead.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                                            {lead.event_date || '-'}
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
    )
}
