import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const { guest_book_id, auth_id } = await readBody<{guest_book_id: number, auth_id: number}>(event)

    const client = await serverSupabaseClient(event)

    try {
        await client
            .from('Guests')
            .delete()
            .eq('guest_id', guest_book_id)
        
        await client
            .from('Guest_book')
            .delete()
            .eq('id', guest_book_id)
        
        await client
            .from('Authentication')
            .delete()
            .eq('id', auth_id)
        
        setResponseStatus(event, 200)
        return 'Deleted guests'
    
    } catch(e) {
        setResponseStatus(event, 500)
        return 'Something went wrong'
    }
})