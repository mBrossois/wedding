import { serverSupabaseClient } from '#supabase/server'
import { Room } from '~/types/rooms'

export default defineEventHandler(async (event) => {
    const { newRoom, oldRoom, authId, amountRooms, bookedDate } = await readBody<{newRoom?: Room, oldRoom?: Room, authId: number, amountRooms: number, bookedDate: Date}>(event)

    const client = await serverSupabaseClient(event)
    console.log(bookedDate)
    try {
        if(oldRoom) {
            await client
                .from('Rooms')
                .update({
                    booked_by: null,
                    child_bed: null,
                    booked_date: null
                })
                .eq('id', oldRoom.id)
                .select()
        }

        if(newRoom) {
            await client
                .from('Rooms')
                .update({
                    booked_by: newRoom.bookedBy,
                    child_bed: newRoom.childBed,
                    booked_date: bookedDate ? bookedDate : new Date()
                })
                .eq('id', newRoom.id)
                .select()
        }
        
        await client
            .from('Guest_book')
            .update({ rooms: amountRooms })
            .eq('auth_id', authId)
            .select()

        setResponseStatus(event, 200)
        return 'Updated room'
    
    } catch(e) {
        setResponseStatus(event, 500)
        return 'Something went wrong'
    }
  })