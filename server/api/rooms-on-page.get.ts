import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const {page} = getQuery<{page: number}>(event)

    const client = await serverSupabaseClient(event)
    const {data: rooms} = await client
        .from('Rooms')
        .select('*')
        .range(20 * page, 20 * page + 19)
            
    if(rooms) {      
        const roomsFormatted = rooms.map(room => {
            return {
                id: room.id,
                name: room.room_title,
                amountOfPeople: room.amount_people,
                bookedBy: room.booked_by
            }
        })
        
        setResponseStatus(event, 200)
        return roomsFormatted
    }

    setResponseStatus(event, 500)
    return 'Something went wrong'
  })