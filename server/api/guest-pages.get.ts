import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const {data: guestBook} = await client
        .from('Guest_book')
        .select('*')
            
    if(guestBook) {
        setResponseStatus(event, 200)
        return Math.ceil(guestBook.length / 20)
    }

    setResponseStatus(event, 500)
    return 'Something went wrong'
  })