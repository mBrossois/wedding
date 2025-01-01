import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const { guest } = await readBody(event)

    const client = await serverSupabaseClient(event)

    try {
        const {data: guestResponse, status: guestsStatus} = await client
            .from('Guests')
            .update({
                first_name: guest.firstName, 
                last_name: guest.lastName, 
                is_adult: guest.isAdult 
            })
            .eq('id', guest.id)
            .select()

        setResponseStatus(event, 200)
        return {response: 'Added guests', data: guestResponse}
    
    } catch(e) {
        setResponseStatus(event, 500)
        return 'Something went wrong'
    }
  })