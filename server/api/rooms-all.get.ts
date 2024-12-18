import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const {data: rooms} = await client
        .from('Rooms')
        .select('*')

    if(rooms) {           
        setResponseStatus(event, 200)
        const availableRooms = rooms.reduce((accumulator, currentValue) => 
            accumulator += !currentValue.booked_by ? 1 : 0,
            0
        )
        
        return {total: rooms.length, available: availableRooms}
    }

    setResponseStatus(event, 500)
    return 'Something went wrong'
  })