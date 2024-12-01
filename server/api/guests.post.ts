import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const { adults, children, rooms, form } = await readBody(event)

    const client = await serverSupabaseClient(event)

    try {
        const {data: auth, status: authStatus} = await client
            .from('Authentication')
            .insert([{}])
            .select()

        const {data: guestBook, status: guestBookStatus} = await client
            .from('Guest_book')
            .insert([
                { adults, children, rooms, free_room: form.isFreeRoom, is_coming: form.isComing, auth_id: auth![0].id },
            ])
            .select()

        const guestsLists = [
            form.adults.map(adult => {
                return { first_name: adult.firstName, last_name: adult.lastName, is_adult: true, guest_id: guestBook![0].id}
            }),
            form.children.map(child => {
                return { first_name: child.firstName, last_name: child.lastName, is_adult: false, guest_id: guestBook![0].id}
            })
        ] 

        const {data: guests, status: guestsStatus} = await client
            .from('Guests')
            .insert(guestsLists.flat())
            .select()

        const roomList = form.rooms.filter((room: {id: number, childBed: boolean}) => room.id !== -1)
        for(const room of roomList) {
            const {data: roomy, status: roomStatus} = await client
                .from('Rooms')
                .update({ booked_by: auth![0].id, child_bed: room.childBed })
                .eq('id', room.id)
                .select()
        }

        setResponseStatus(event, 200)
        return 'Added guests'
    
    } catch(e) {
        setResponseStatus(event, 500)
        return 'Something went wrong'
    }
  })