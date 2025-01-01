import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const { id, amountAdults } = await readBody(event)

    const client = await serverSupabaseClient(event)

    try {
        const {data: guestBook, status: guestBookStatus} = await client
            .from('Guest_book')
            .update({ adults: amountAdults })
            .eq('id', id)
            .select()

        const {data: guest, status: guestsStatus} = await client
            .from('Guests')
            .insert([
                {guest_id: id}
            ])
            .select()

        setResponseStatus(event, 200)
        return {response: 'Added guests', data: guest}
    
    } catch(e) {
        setResponseStatus(event, 500)
        return 'Something went wrong'
    }
  })