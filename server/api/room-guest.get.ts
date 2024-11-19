import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const {guestId} = getQuery<{guestId: number}>(event)

    try {
        const client = await serverSupabaseClient(event)
        const {data: guestBook} = await client
            .from('Guest_book')
            .select('*')
            .eq('id', guestId)
                
        const {data: guest} = await client
            .from('Guest_book')
            .select('first_name, second_name')
            .eq('guest_id', guestId)
            .limit(1)
    
        setResponseStatus(event, 200)
        return guest
        
    } catch(e) {
        setResponseStatus(event, 500)
        return 'Something went wrong'
    }
  })