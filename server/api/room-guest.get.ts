import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const {authId} = getQuery<{authId: number}>(event)

    try {
        const client = await serverSupabaseClient(event)
        const {data: guestBook} = await client
            .from('Guest_book')
            .select('id, free_room')
            .eq('auth_id', authId)
            .single()

        const {data: guest} = await client
            .from('Guests')
            .select('first_name, last_name')
            .eq('guest_id', guestBook?.id)
            .limit(1)
        
        setResponseStatus(event, 200)
        return {bookedBy: guest[0].first_name + ' ' + guest[0].last_name, free: guestBook?.free_room}
        
    } catch(e) {
        setResponseStatus(event, 500)
        return 'Something went wrong'
    }
  })