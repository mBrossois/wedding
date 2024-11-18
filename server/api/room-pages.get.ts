import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const {data: rooms} = await client
        .from('Rooms')
        .select('*')
            
    if(rooms) {
        setResponseStatus(event, 200)
        return Math.ceil(rooms.length / 20)
    }

    setResponseStatus(event, 500)
    return 'Something went wrong'
  })