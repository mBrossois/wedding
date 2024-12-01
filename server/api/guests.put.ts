import { serverSupabaseClient } from '#supabase/server'
import { Form } from '~/types/guests'

export default defineEventHandler(async (event) => {
    const { form, guest_book_id } = await readBody<{form: Form, guest_book_id: number, auth_id: number}>(event)

    const client = await serverSupabaseClient(event)

    try {
        const allEntries = [
            ...form.adults.map(adult => {return {first_name: adult.firstName, last_name: adult.lastName, is_adult: true, guest_id: guest_book_id}}),
            ...form.children.map(adult => {return {first_name: adult.firstName, last_name: adult.lastName, is_adult: false, guest_id: guest_book_id}})
        ]

        const {data} = await client
            .from('Guests')
            .delete()
            .eq('guest_id', guest_book_id)

        
        await client
            .from('Guests')
            .insert(allEntries)
            .select()

        const { data: guestBook } = await client
            .from('Guest_book')
            .update({
                adults: form.adults.length,
                children: form.children.length,
                rooms: form.rooms.length,
                is_coming: form.isComing,
                free_room: form.isFreeRoom
            })
            .eq('id', guest_book_id)
            .select()

        await client
            .from('Rooms')
            .update({
                booked_by: null,
                child_bed: null
            })
            .eq('booked_by', guestBook[0].auth_id)

        const roomList = form.rooms.filter((room: {id: number, childBed: boolean}) => room.id !== -1)
        for(const room of roomList) {
            const {data: roomy, status: roomStatus} = await client
                .from('Rooms')
                .update({ booked_by: guestBook[0].auth_id, child_bed: room.childBed })
                .eq('id', room.id)
                .select()
        }
    
        
        setResponseStatus(event, 200)
        return 'Updated guests'
    
    } catch(e) {
        setResponseStatus(event, 500)
        return 'Something went wrong'
    }
  })