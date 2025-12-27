"use server"

// Imports removed as they were unused
import { supabase, supabaseAdmin } from './lib/supabase'

export async function uploadImage(formData: FormData) {
    const file = formData.get('file') as File
    if (!file) return { success: false, error: 'No file provided' }

    if (!supabaseAdmin) {
        return { success: false, error: 'Server configuration error: Missing Admin Key' }
    }

    try {
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const fileName = `${Date.now()}_${file.name.replace(/\s/g, '_')}`

        const { error } = await supabaseAdmin.storage
            .from('portfolio')
            .upload(fileName, buffer, {
                contentType: file.type,
                upsert: false
            })

        if (error) throw error

        // ... existing code ...
        const { data: { publicUrl } } = supabaseAdmin.storage
            .from('portfolio')
            .getPublicUrl(fileName)

        // Insert into database
        const { error: dbError } = await supabaseAdmin
            .from('portfolio')
            .insert([
                {
                    title: file.name,
                    image_url: publicUrl,
                    category: 'Generative' // Default category
                }
            ])

        if (dbError) throw dbError

        return { success: true, url: publicUrl }
    } catch (error: any) {
        console.error('Error uploading image:', error)
        return { success: false, error: error.message }
    }
}

// ... existing imports

export async function getAdminData() {
    console.log('--- Fetching Admin Data ---')
    if (!supabaseAdmin) {
        console.error('CRITICAL: supabaseAdmin is NULL. Check server logs for env var issues.')
        return { success: false, error: 'Server configuration error: Missing Admin Key' }
    }

    try {
        console.log('Querying leads table...')
        const [leadsResult, interactionsResult, portfolioResult] = await Promise.all([
            supabaseAdmin.from('leads').select('*').order('created_at', { ascending: false }),
            supabaseAdmin.from('interactions').select('*'),
            supabaseAdmin.from('portfolio').select('*').order('created_at', { ascending: false })
        ])

        if (leadsResult.error) {
            console.error('Error fetching leads:', leadsResult.error)
            throw leadsResult.error
        }

        console.log(`Leads found: ${leadsResult.data?.length}`)
        console.log(`Interactions found: ${interactionsResult.data?.length}`)
        console.log(`Portfolio items found: ${portfolioResult.data?.length}`)

        if (interactionsResult.error) throw interactionsResult.error
        if (portfolioResult.error) throw portfolioResult.error

        return {
            success: true,
            leads: leadsResult.data,
            interactions: interactionsResult.data,
            portfolio: portfolioResult.data
        }
    } catch (error: any) {
        console.error('Error in getAdminData:', error)
        return { success: false, error: error.message }
    }
}

export async function trackInteraction(type: 'whatsapp_click' | 'call_click') {
    // console.log('Tracking interaction:', type)

    const { error } = await supabase
        .from('interactions')
        .insert([{ type, page: 'home' }]) // Added page tracking default

    if (error) {
        console.error('Error tracking interaction:', error)
        return { success: false, error: error.message }
    }

    return { success: true }
}

export async function submitLead(formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const dateStr = formData.get('date') as string // Form might send 'date' or 'event_date'
    const message = formData.get('message') as string
    const location = formData.get('location') as string

    const { error } = await supabase
        .from('leads')
        .insert([
            {
                name,
                email,
                phone,
                event_date: dateStr || null,
                location: location || null,
                message,
                type: 'General', // Default type
                created_at: new Date().toISOString()
            }
        ])

    if (error) {
        console.error('Error submitting lead:', error)
        return { success: false, error: error.message }
    }

    return { success: true }
}

export async function deleteImage(id: string, imageUrl: string) {
    if (!supabaseAdmin) {
        return { success: false, error: 'Server configuration error: Missing Admin Key' }
    }

    try {
        // 1. Delete from Storage
        const fileName = imageUrl.split('/').pop()
        if (fileName) {
            const { error: storageError } = await supabaseAdmin.storage
                .from('portfolio')
                .remove([fileName])

            if (storageError) {
                console.error('Error deleting from storage:', storageError)
            }
        }

        // 2. Delete from Database
        const { error: dbError } = await supabaseAdmin
            .from('portfolio')
            .delete()
            .eq('id', id)

        if (dbError) throw dbError

        return { success: true }
    } catch (error: any) {
        console.error('Error deleting image:', error)
        return { success: false, error: error.message }
    }
}
