import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const {data: rooms} = await client
        .from('Rooms')
        .select('*')

    if(rooms) {           
        return rooms.map(room => { 
            return {
                id: room.id, 
                bookedBy: room.booked_by, 
                roomTitle: room.room_title, 
                childBed: room.child_bed,
                bookedDate: room.booked_date
            }
        })
    }

    setResponseStatus(event, 500)
    return 'Something went wrong'
  })