import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const {guest_book_id} = getQuery<{guest_book_id: number}>(event)

    const client = await serverSupabaseClient(event)
    const {data: guest} = await client
        .from('Guests')
        .select('*')
        .eq('guest_id', guest_book_id)
            
    if(guest) {
        setResponseStatus(event, 200)
        return guest
    }

    setResponseStatus(event, 500)
    return 'Something went wrong'
  })