import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const {data: rooms} = await client
        .from('Rooms')
        .select('*')
        .is('booked_by', null)
            
    if(rooms) {              
        setResponseStatus(event, 200)
        return rooms.map(room => {return {title: room.room_title, value: room.id}})
    }

    setResponseStatus(event, 500)
    return 'Something went wrong'
  })