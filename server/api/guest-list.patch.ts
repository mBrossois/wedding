import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const { guest, guestBookId } = await readBody(event)

    const client = await serverSupabaseClient(event)

    try {
        const {data: guestResponse} = await client
            .from('Guests')
            .update({
                first_name: guest.firstName, 
                last_name: guest.lastName, 
                is_adult: guest.isAdult 
            })
            .eq('id', guest.id)
            .select()

        const { data: guestAmount } = await client
            .from('Guests')
            .select('is_adult')
            .eq('guest_id', guestBookId)

        const adults = guestAmount?.filter(guest => guest.is_adult).length
        const children = guestAmount?.filter(guest => !guest.is_adult).length

        const {data: guestBookResponse} = await client
            .from('Guest_book')
            .update({
                adults,
                children
            })
            .eq('id', guestBookId)
            .select()

            if(!guestBookResponse) {
                setResponseStatus(event, 400)
                return 'We could not update amount of guests'
            }

        setResponseStatus(event, 200)
        return {response: 'Added guests', data: guestResponse}
    
    } catch(e) {
        setResponseStatus(event, 500)
        return 'Something went wrong'
    }
  })