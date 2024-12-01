import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const {auth_id} = getQuery<{auth_id: number}>(event)
    const client = await serverSupabaseClient(event)

    const {data: rooms} = await client
        .from('Rooms')
        .select('id, room_title, child_bed')
        .eq('booked_by', auth_id)
            
    if(rooms) {              
        setResponseStatus(event, 200)
        return rooms
    }

    setResponseStatus(event, 500)
    return 'Something went wrong'
  })