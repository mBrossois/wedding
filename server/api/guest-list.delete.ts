import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const { id } = await readBody(event)

    const client = await serverSupabaseClient(event)

    try {
        const {data: guestResponse, status: guestsStatus} = await client
            .from('Guests')
            .delete()
            .eq('id', id)

        setResponseStatus(event, 200)
        return {response: 'Added guests', data: guestResponse}
    
    } catch(e) {
        setResponseStatus(event, 500)
        return 'Something went wrong'
    }
  })